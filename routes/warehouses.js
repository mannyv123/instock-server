const express = require("express");
const router = express.Router();

router.get("/api/warehouses", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a list of warehouses");
});

router.get("/api/warehouses/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a specific warehouse");
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
