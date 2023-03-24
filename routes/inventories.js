const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

router.get("/inventories", (req, res) => {
  knex('inventories')
    .select('inventories.id', 'inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity', 'warehouses.warehouse_name as warehouse_id')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventories ${err}`));
});

router.get("/inventories/:id", (req, res) => {
  const id = req.params.id;
  knex('inventories')
    .select('inventories.id', 'inventories.item_name', 'inventories.description', 'inventories.category', 'inventories.status', 'inventories.quantity', 'warehouses.warehouse_name as warehouse_id')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .where('inventories.id', id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventory ${id}: ${err}`));
});




// // GET /api/inventories/:id
// router.get("/inventories/:id", async (req, res) => {
//   try {
//     // we are extracting id from params here and storing it in id variable.
//     // we are using the same id variable in knex("inventories").
//     const { id } = req.params;

//     const result = await knex("inventories").where("id", id).first();
//     if (result) {
//       // This sends 200 if found
//       res.status(200).json(result);
//     } else {
//       // This sends 404 not found if not found
//       res.status(404).send(`inventory ${id} Not Found`);
//     }
//   } catch (error) {
//     // catches all errors
//     res.status(404).send(`inventory ${id} Not Found`);
//     console.log(error);
//   }
// });

router.post("/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: create an inventory");
});

router.put("/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: update specific inventory");
});

router.delete("/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: delete a specific inventory");
});

module.exports = router;
