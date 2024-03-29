const express = require("express");
const PostRoute = express.Router();
const PostController = require("../Controller/PostController");
const { verifyToken } = require("../utils/verifyuser");

PostRoute.post("/create", verifyToken, PostController.CreatePost);
PostRoute.get("/getposts", PostController.GetAllPosts);
PostRoute.put(
  "/update/:postId/:userId",
  verifyToken,
  PostController.UpdatePost
);
PostRoute.delete(
  "/delete/:postId/:userId",
  verifyToken,
  PostController.DeletePost
);

module.exports = PostRoute;
