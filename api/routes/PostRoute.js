const express = require("express");
const PostRoute = express.Router();
const PostController = require("../Controller/PostController");
const { verifyToken } = require("../utils/verifyuser");

PostRoute.post("/create", verifyToken, PostController.CreatePost);
PostRoute.get("/getposts", PostController.GetAllPosts);

module.exports = PostRoute;
