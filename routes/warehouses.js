const express = require("express");
const router = express.Router();

router.get("/warehouses", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a list of warehouses");
});

router.get("/warehouses/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a specific warehouse");
});

router.post("/warehouses", (req, res) => {
  res.send("NOT IMPLEMENTED: create a warehouse");
});

router.put("/warehouses/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: update specific warehouse");
});

router.delete("/warehouses/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: delete a specific warehouse");
});



module.exports = router;
