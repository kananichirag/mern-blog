const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberoflikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = new mongoose.model("Comment", commentSchema);
module.exports = Comment;
