const express = require("express");
const UserRoute = express.Router();
const UserController = require("../Controller/UserController");
const { verifyToken } = require("../utils/verifyuser");

UserRoute.put("/update/:id", verifyToken, UserController.UpdateUser);
UserRoute.delete("/delete/:id", verifyToken, UserController.DeleteUser);
UserRoute.post("/signout", UserController.SignOut);
UserRoute.get("/getuser", verifyToken, UserController.GetAllUser);
UserRoute.delete("/delete", verifyToken, UserController.GetAllUser);
UserRoute.get("/:userId", UserController.GetUser);

module.exports = UserRoute;
