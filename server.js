const knex = require("knex")(require("./knexfile"));
const cors = require("cors");
const express = require("express");
const app = express();

// Path to the routes folder/files.
const warehousesRouter = require("./routes/warehouses");
const inventoriesRouter = require("./routes/inventories");

//Configuration
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(express.static("public"));
app.use(express.json());

//Routes
app.use("/api", warehousesRouter);
app.use("/api", inventoriesRouter);

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
