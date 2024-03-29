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

const GetAllPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startindex || 0);
    const limit = parseInt(req.query.limit || 9);
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {};
    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.slug) query.slug = req.query.slug;
    if (req.query.postId) query._id = req.query.postId;
    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeletePost = async (req, res) => {
  if (!req.user.isAdmin || req.user.id != req.params.userId) {
    return res.json({
      success: false,
      msg: "You are not allowed to delete this post..!!",
    });
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ success: true, msg: "Post has been deleted..!!" });
  } catch (error) {
    console.log(error);
  }
};

const UpdatePost = async (req, res) => {
  if (!req.user.isAdmin || req.user.id != req.params.userId) {
    return res.json({
      success: false,
      msg: "You are not allowed to update this post..!!",
    });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, msg: "Post updated.!!", post: updatedPost });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreatePost,
  GetAllPosts,
  DeletePost,
  UpdatePost,
};
