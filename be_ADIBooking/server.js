const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { getADIs, signUpADI, getAvailability } = require("./utils/Modules/ADIModules");

const app = express();

app.use(bodyParser.json());

app.post("/signup", signUpADI);
app.get("/", getADIs);
app.get("/availability", getAvailability);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
