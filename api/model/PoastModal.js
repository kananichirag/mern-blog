const mongoose = require("mongoose");

const postschema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.etatvasoft.com/blog/wp-content/uploads/2023/08/Top-12-PHP-Best-Practices-for-Web-developers.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const PostModal = new mongoose.model("Post", postschema);
module.exports = PostModal;
