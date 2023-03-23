const express = require("express");
const router = express.Router();

router.get("/inventories", (req, res) => {
    res.send("NOT IMPLEMENTED: returns a list of inventories");
});

router.get("/inventories/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: returns a specific inventory");
});

//----------------------------Manjot Code Start--------------------------------

router.post("/inventories", (req, res) => {
    res.send("NOT IMPLEMENTED: create an inventory");
});

//----------------------------Manjot Code End--------------------------------

router.put("/inventories/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: update specific inventory");
});

router.delete("/inventories/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: delete a specific inventory");
});

module.exports = router;
