const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
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


router.post("/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: create an inventory");
});

router.put("/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: update specific inventory");
});

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
