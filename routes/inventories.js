const express = require("express");
const router = express.Router();
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
        req.body.id = uuidv4();
        console.log(req.body);
        // const result = await knex("inventories").insert(req.body);
        // res.status(201).send(result[0]);
    } catch (error) {
        res.status(400).send(error);
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
