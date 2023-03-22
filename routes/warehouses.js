const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/api/warehouses", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a list of warehouses");
});

// I am working on J2VT1-15 here. -GJ
router.get("/api/warehouses/:id", (req, res) => {
  // we are extracting id from params here and storing it in id variable.
  // we are using the same id variable in knex("warehouses").
  const { id } = req.params;
  knex("warehouses")
    .where("id", id)
    .first()
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        // This sends 404 not found if not found
        res.sendStatus(404);
      }
    });
});

router.post("/api/warehouses", (req, res) => {
  res.send("NOT IMPLEMENTED: create a warehouse");
});

router.put("/api/warehouses/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: update specific warehouse");
});

router.delete("/api/warehouses/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: delete a specific warehouse");
});

module.exports = router;
