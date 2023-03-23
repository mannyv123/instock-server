const express = require("express");
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a list of inventories");
});

router.get("/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a specific inventory");
});

router.post("/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: create an inventory");
});

// ------JIRA TICKET #J2VT1-29 -GJ-------------------------------------
router.put("/inventories/:id", async (req, res) => {
  try {
    // req.params is the :id in my url
    const { id } = req.params;
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

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
      const warehouse = await knex("warehouses")
        .where("id", warehouse_id)
        .first();
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
  res.send("NOT IMPLEMENTED: delete a specific inventory");
});

module.exports = router;
