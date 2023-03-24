const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();
const { v4: uuidv4 } = require("uuid");


// ------JIRA TICKET #J2VT1-25 -SEYON-------------------------------------
router.get("/inventories", (req, res) => {
  knex('inventories')
    .select('inventories.id', 'inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity', 'warehouses.warehouse_name as warehouse_id')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventories ${err}`));
});

// -----------------SEYON CODE END----------------------------------------


//----------------------------Manjot Code Start--------------------------------

//POST route to create new inventory
router.post("/inventories", async (req, res) => {
    try {
        //Validation for request body
        const { warehouse_id, item_name, description, category, status, quantity } = req.body;
        const warehouseIdCheck = await knex("warehouses").where({ id: warehouse_id });

        if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
            return res.status(400).send("Please verify there are no blank input fields");
        } else if (!warehouseIdCheck.length) {
            return res.status(400).send(`A warehouse with ID ${warehouse_id} does not exist`);
        } else if (typeof quantity !== "number") {
            return res.status(400).send("Quantity value must be a number");
        }

        //If no validation issues, proceed to create new inventory item
        req.body.id = uuidv4();
        await knex("inventories").insert(req.body);
        const newInventoryUrl = `/api/inventories/${req.body.id}`;
        res.status(201).location(newInventoryUrl).send(newInventoryUrl);
    } catch (error) {
        res.status(400).send(`Error creating inventory: ${error}`);
    }
});

//----------------------------Manjot Code End--------------------------------

// ------JIRA TICKET #J2VT1-29 -GJ-------------------------------------
router.put("/inventories/:id", async (req, res) => {
    try {
        // req.params is the :id in my url
        const { id } = req.params;
        const { warehouse_id, item_name, description, category, status, quantity } = req.body;

        // This is validation
        // inventories is the name of the table in knex
        const inventory = await knex("inventories").where("id", id).first();
        if (!inventory) {
            res.status(404).send(`Inventory ${id} not found!`);
        } else if (
            warehouse_id === "" ||
            item_name === "" ||
            description === "" ||
            category === "" ||
            status === "" ||
            quantity === "" ||
            // This checks if quantity is a number
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            isNaN(parseInt(quantity))
        ) {
            // 400 status means "Bad Request"
            res.status(400).send("Sorry! Invalid values");
        } else {
            const warehouse = await knex("warehouses").where("id", warehouse_id).first();
            if (!warehouse) {
                res.status(400).send(`Warehouse ${warehouse_id} not found!`);
            } else {
                // validated
                // This is the payload we are giving to the database.
                const inventory_object = {
                    id,
                    warehouse_id,
                    item_name,
                    description,
                    category,
                    status,
                    quantity,
                };
                await knex("inventories")
                    .update(inventory_object)
                    // This is the inventories id that we want to update.
                    // we are updating it with the values above.
                    .where("id", id);
                // This sends the inventory object
                res.send(inventory_object);
            }
        }
    } catch (error) {
        // catches all errors
        res.status(404).send("Sorry! Invalid values");
        console.log(error);
    }
});
// -----------------GJ CODE END----------------------------------------

router.delete("/inventories/:id", (req, res) => {
  const id = req.params.id;
  knex('inventories')
    .where('id', id)
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).send(`Inventory item with id ${id} deleted successfully`);
      } else {
        res.status(404).send(`Inventory item with id ${id} not found`);
      }
    })
    .catch((err) => res.status(400).send(`Error deleting Inventory item ${id}: ${err}`));
});

module.exports = router;
