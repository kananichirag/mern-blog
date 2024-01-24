const express = require("express");
const AuthRoute = express.Router();
const AuthControllre = require("../Controller/AuthController");

AuthRoute.post("/signup", AuthControllre.SignUp);

module.exports = AuthRoute;
