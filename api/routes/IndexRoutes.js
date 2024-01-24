const express = require("express");
const IndexRoute = express.Router();
const UserRoutes = require("../routes/UserRoutes");
const Authroutes = require('../routes/AuthRoutes')

IndexRoute.use("/user", UserRoutes);
IndexRoute.use("/auth", Authroutes);

module.exports = IndexRoute;
