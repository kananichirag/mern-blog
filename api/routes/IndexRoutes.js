const express = require("express");
const IndexRoute = express.Router();
const UserRoutes = require("../routes/UserRoutes");
const Authroutes = require("../routes/AuthRoutes");
const PostRoutes = require("../routes/PostRoute");
const CommentRoutes = require('../routes/CommentRoutes')

IndexRoute.use("/user", UserRoutes);
IndexRoute.use("/auth", Authroutes);
IndexRoute.use("/post", PostRoutes);
IndexRoute.use("/comment", CommentRoutes);

module.exports = IndexRoute;
