const express = require("express");
const router = express.Router();

router.get("/api/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a list of inventories");
});

router.get("/api/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: returns a specific inventory");
});

router.post("/api/inventories", (req, res) => {
  res.send("NOT IMPLEMENTED: create an inventory");
});

router.put("/api/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: update specific inventory");
});

router.delete("/api/inventories/:id", (req, res) => {
  res.send("NOT IMPLEMENTED: delete a specific inventory");
});

module.exports = router;
