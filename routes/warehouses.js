const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

router.get("/warehouses", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a list of warehouses");
});

router.get("/warehouses/:id", (req, res) => {
  const id = req.params.id;
  knex('warehouses')
    .select('address', 'contact_name', 'contact_phone', 'contact_email')
    .where('id', id)
    .then((warehouseData) => {
      knex('inventories')
        .select('inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity')
        .where('warehouse_id', id)
        .then((inventoryData) => {
          const data = {
            warehouse: warehouseData[0],
            inventories: inventoryData
          };
          res.status(200).json(data);
        })
        .catch((err) => res.status(400).send(`Error retrieving Inventories for Warehouse ${id}: ${err}`));
    })
    .catch((err) => res.status(400).send(`Error retrieving Warehouse ${id}: ${err}`));
});




// ------JIRA TICKET #J2VT1-15 -GJ-------------------------------------

// // GET /api/warehouses/:id
// router.get("/warehouses/:id", async (req, res) => {
//   try {
//     // we are extracting id from params here and storing it in id variable.
//     // we are using the same id variable in knex("warehouses").
//     const { id } = req.params;

//     const result = await knex("warehouses").where("id", id).first();
//     if (result) {
//       // This sends 200 if found
//       res.status(200).json(result);
//     } else {
//       // This sends 404 not found if not found
//       res.status(404).send(`Warehouse ${id} Not Found`);
//     }
//   } catch (error) {
//     // catches all errors
//     res.status(404).send(`Warehouse ${id} Not Found`);
//     console.log(error);
//   }
// });

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

router.put('/warehouses/:id', async (req, res) => {
  const { id } = req.params;
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  try {
    // Use knex to update warehouse details based on the ID provided
    const updatedWarehouse = await knex('warehouses')
      .where('id', '=', id)
      .update({
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      });

    // If no warehouse is found with the provided ID, return a 404 status code
    if (!updatedWarehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    // Return the updated warehouse details in JSON format
    return res.status(200).json({
      id,
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    });

  } catch (err) {
    // Handle any errors that occur during the database update
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//-----------Manjot Code Start------------------------

//Endpoint to delete a warehouse
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
