const express = require("express");
const mongoose = require("mongoose");
const IndexRoutes = require("../api/routes/IndexRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/v1", IndexRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("Mongodb Connected.!!"))
  .catch((err) => console.log("Connecting Error ==>", err));

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server Start at ${process.env.PORT}`)
);
