const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
app.use(bodyParser.json());
app.use(express.json({ limit: "8000kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(morgan("dev"));
require("dotenv-flow").config();

const router = require("./routes/routes.js");

app.use("/", router);

module.exports = app;
