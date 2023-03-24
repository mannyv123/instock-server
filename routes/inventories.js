const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

router.get("/inventories", (req, res) => {
    res.send("NOT IMPLEMENTED: returns a list of inventories");
});

router.get("/inventories/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: returns a specific inventory");
});

//----------------------------Manjot Code Start--------------------------------

// router.post("/inventories", (req, res) => {
//     res.send("NOT IMPLEMENTED: create an inventory");
// });

router.post("/inventories", async (req, res) => {
    try {
        //need to add validation

        req.body.id = uuidv4();
        await knex("inventories").insert(req.body);
        const newInventoryUrl = `/api/inventories/${req.body.id}`;
        res.status(201).location(newInventoryUrl).send(newInventoryUrl);
    } catch (error) {
        res.status(400).send(`Error creating inventory: ${error}`);
    }
});

//----------------------------Manjot Code End--------------------------------

router.put("/inventories/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: update specific inventory");
});

router.delete("/inventories/:id", (req, res) => {
    res.send("NOT IMPLEMENTED: delete a specific inventory");
});

module.exports = router;
