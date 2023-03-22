const { response } = require("express");
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

//-----------Manjot Code Start------------------------

//Endpoint to delete a warehouse
router.delete("/warehouses/:id", (req, res) => {
    const { warehouseId } = req.params;
    knex("warehouses")
        .where("id", warehouseId)
        .del()
        .then((response) => {
            res.status(204).send("NOT IMPLEMENTED: delete a specific warehouse");
        })
        .catch((error) => {
            res.status(404).send("Warehouse ID not found");
        });
});

//-----------Manjot Code End--------------------------

module.exports = router;
