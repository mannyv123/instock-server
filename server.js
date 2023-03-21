const cors = require("cors");

const express = require("express");

const app = express();

const port = 8000;

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
// app.use(express.static("public"));
app.use(express.json());



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
