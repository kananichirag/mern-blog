const express = require("express");
const IndexRoute = express.Router();
const UserRoutes = require("../routes/UserRoutes");
const Authroutes = require("../routes/AuthRoutes");
const PostRoutes = require("../routes/PostRoute");

IndexRoute.use("/user", UserRoutes);
IndexRoute.use("/auth", Authroutes);
IndexRoute.use("/post", PostRoutes);

module.exports = IndexRoute;
