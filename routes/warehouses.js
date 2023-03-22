const { response } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

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

//-----------Manjot Code Start------------------------

//Endpoint to delete a warehouse
router.delete("/warehouses/:id", (req, res) => {
    knex("warehouses")
        .where({ id: req.params.id })
        .then((data) => {
            if (data.length) {
                knex("warehouses")
                    .delete()
                    .where({ id: req.params.id })
                    .then((response) => {
                        res.status(204).send();
                    })
                    .catch((error) => {
                        res.status(404).send(`Warehouse ID not found ${error}`);
                    });
            } else {
                res.status(404).send(`Warehouse ID ${req.params.id} not found`);
            }
        })
        .catch((error) => {
            res.status(404).send(`Warehouse ID not found ${error}`);
        });
});

//-----------Manjot Code End--------------------------

module.exports = router;
