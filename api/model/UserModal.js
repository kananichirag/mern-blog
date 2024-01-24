const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uniquue: true,
    },
    email: {
      type: String,
      required: true,
      uniquue: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("user", userSchema);
module.exports = User;
