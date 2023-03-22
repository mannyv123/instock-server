const knex = require("knex")(require("./knexfile"));

const cors = require("cors");

const express = require("express");

const app = express();

// Path to the routes folder/files.
const warehousesRouter = require("./routes/warehouses");
const inventoriesRouter = require("./routes/inventories");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// ---WORKBENCH NOT WORKING FOR SOME REASON. USING THIS TO SEE IF IT'S WORKING -GJ----

// app.get("/test", (req, res) => {
//   knex
//     .select("*")
//     .from("inventories")
//     .then((data) => {
//       res.json(data);
//     });
// });

// --------------------------------------------------------------------------------

app.use(cors());
// app.use(express.static("public"));
app.use(express.json());

app.use(warehousesRouter);
app.use(inventoriesRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
