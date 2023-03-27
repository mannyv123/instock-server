const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

// router.get("/warehouses", (req, res) => {
//   res.send("NOT IMPLEMENTED: returns a list of warehouses");
// });

// ------JIRA TICKET #J2VT1-14 -  FELIPE-------------------------------------

router.get("/warehouses", (req, res) => {
  // diving deeper -GJ
  // This gives it two key value pairs
  // http://localhost:5005/api/warehouses?sort_by=warehouse_name&order_by=asc
  // https://stackoverflow.com/questions/36353837/knex-js-multiple-orderby-columns
  const { sort_by = "warehouse_name", order_by = "asc" } = req.query;
  // ------------------

  knex("warehouses")
    .select("*")
    // diving deeper -GJ
    .orderBy(sort_by, order_by)
    // ------------------
    .then((warehouses) => {
      res.status(200).json(warehouses);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

// ------ FELIPE CODE END-------------------------------------

// ------JIRA TICKET #J2VT1-15 -GJ-------------------------------------

// GET /api/warehouses/:id
router.get("/warehouses/:id", async (req, res) => {
  try {
    // we are extracting id from params here and storing it in id variable.
    // we are using the same id variable in knex("warehouses").
    const { id } = req.params;
    // This gives us a single warehouse based on the id.
    const result = await knex("warehouses").where("id", id).first();
    const inventories = await knex("inventories").where("warehouse_id", id);

    if (result) {
      result.inventories = inventories;
      // This sends 200 if found
      res.status(200).json(result);
    } else {
      // This sends 404 not found if not found
      res.status(404).send(`Warehouse ${id} Not Found`);
    }
  } catch (error) {
    // catches all errors
    res.status(404).send(`Warehouse ${id} Not Found`);
    console.log(error);
  }
});

// -----------------GJ CODE END----------------------------------------

// ------JIRA TICKET #J2VT1-16 -GJ-------------------------------------
// POST /api/warehouses
router.post("/warehouses", async (req, res) => {
  // req is the client. res is the response from the server
  try {
    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body; // This is the payload we are receiving from the client

    const re_email = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"); // regular expression matches w something@something.com
    const re_phone = new RegExp("[0-9]{3}[0-9]{3}[0-9]{4}"); // regular expression matches w 1231231234

    // This is validation
    if (
      warehouse_name === "" ||
      address === "" ||
      city === "" ||
      country === "" ||
      contact_name === "" ||
      contact_position === "" ||
      contact_phone === "" ||
      // test compares the regular expression with contact_phone.
      // "!" if it's true, it means it's valid.
      !re_phone.test(contact_phone) ||
      contact_email === "" ||
      !re_email.test(contact_email)
    ) {
      // 400 status means "Bad Request"
      res.status(400).send("Sorry! Invalid values");
    } else {
      // validated
      // This is the payload we are giving to the database.
      const warehouse_object = {
        id: uuidv4(),
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      };

      const result = await knex("warehouses").insert(warehouse_object);
      res.status(201).send(warehouse_object);
    }
  } catch (error) {
    // catches all errors
    res.status(400).send("Sorry! Invalid values");
    console.log(error);
  }
});
// -----------------GJ CODE END----------------------------------------



// ------JIRA TICKET #J2VT1-18 -SEYON-------------------------------------
const validateBody = (body) => {
    const errors = {};
    const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = body;
  
    if (!warehouse_name) errors.warehouse_name = 'Warehouse name is required';
    if (!address) errors.address = 'Address is required';
    if (!city) errors.city = 'City is required';
    if (!country) errors.country = 'Country is required';
    if (!contact_name) errors.contact_name = 'Contact name is required';
    if (!contact_position) errors.contact_position = 'Contact position is required';
    if (!contact_phone) errors.contact_phone = 'Contact phone is required';
    if (!contact_email) errors.contact_email = 'Contact email is required';
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) errors.contact_email = 'Invalid email address';
    if (!/^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/.test(contact_phone)) errors.contact_phone = 'Invalid phone number';
    
    return errors;
  };
  
  router.put('/api/warehouses/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
  
    const errors = validateBody(body);
  
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
  
    knex('warehouses')
      .where({ id })
      .update(body)
      .returning('*')
      .then((updatedWarehouse) => {
        if (updatedWarehouse.length === 0) {
          return res.status(404).json({ error: 'Warehouse not found' });
        }
  
        res.json(updatedWarehouse[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the warehouse' });
      });
  });
  // -----------------SEYON CODE END----------------------------------------


//-----------Manjot Code Start------------------------

//Endpoint to get list of inventory for specific warehouse
router.get("/warehouses/:id/inventories", async (req, res) => {
  try {
    const result = await knex("inventories").where({
      warehouse_id: req.params.id,
    });
    if (result.length) {
      return res.status(200).send(result);
    }
    return res.status(404).send(`Warehouse with ID ${req.params.id} not found`);
  } catch (error) {
    return res.status(500).send(`Error with the server/database: ${error}`);
  }
});

//Endpoint to delete a warehouse
//try changing to async await
router.delete("/warehouses/:id", (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((data) => {
      //check first if data exists; if so, delete the warehouse
      if (data.length) {
        knex("warehouses")
          .delete()
          .where({ id: req.params.id })
          .then((response) => {
            res.status(204).send();
          })
          .catch((error) => {
            //send error if delete not successful
            res.status(404).send(`Warehouse ID not found ${error}`);
          });
      } else {
        //send error if warehouse ID does not exist
        res.status(404).send(`Warehouse ID ${req.params.id} not found`);
      }
    })
    //send error if selecting the id errors out
    .catch((error) => {
      res.status(404).send(`Warehouse ID not found ${error}`);
    });
});

//-----------Manjot Code End--------------------------

module.exports = router;
