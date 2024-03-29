const express = require("express");
const CommentRoute = express.Router();
const CommentController = require("../Controller/CommentController");
const { verifyToken } = require("../utils/verifyuser");

CommentRoute.post("/create", verifyToken, CommentController.CreateComment);

module.exports = CommentRoute;
