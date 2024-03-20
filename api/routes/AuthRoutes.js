const express = require("express");
const AuthRoute = express.Router();
const AuthControllre = require("../Controller/AuthController");

AuthRoute.post("/signup", AuthControllre.SignUp);
AuthRoute.post("/signin", AuthControllre.SignIn);
AuthRoute.post("/google", AuthControllre.GoogleAuth);

module.exports = AuthRoute;
