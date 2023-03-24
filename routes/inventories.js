const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

router.post("/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: create an inventory");
});

router.put("/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: update specific inventory");
});

// ------JIRA TICKET #J2VT1-30 -SEYON-------------------------------------
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
// -----------------SEYON CODE END----------------------------------------



module.exports = router;
