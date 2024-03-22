const express = require("express");
const UserRoute = express.Router();
const UserController = require("../Controller/UserController");
const { verifyToken } = require("../utils/verifyuser");

UserRoute.put("/update/:id", verifyToken, UserController.UpdateUser);
UserRoute.delete("/delete/:id", verifyToken, UserController.DeleteUser);

module.exports = UserRoute;
