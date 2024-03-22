const express = require("express");
const PostRoute = express.Router();
const PostController = require("../Controller/PostController");
const { verifyToken } = require("../utils/verifyuser");

PostRoute.post("/create", verifyToken, PostController.CreatePost);

module.exports = PostRoute;
