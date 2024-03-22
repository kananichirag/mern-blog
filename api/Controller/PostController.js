const Post = require("../model/PoastModal");

const CreatePost = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.json({
      success: false,
      msg: "You are not allow to Create post.!!",
    });
  }
  if (!req.body.title || !req.body.content) {
    return res.json({
      success: false,
      msg: "Please provide all required fields.!!",
    });
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newpost = new Post({ ...req.body, slug, userId: req.user.id });
  try {
    const savepost = await newpost.save();
    res.status(200).json({
      success: true,
      msg: "Post created successfully.!! ",
      post: savepost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error.message });
  }
};

module.exports = {
  CreatePost,
};
