const Comment = require("../model/CommentModal");

const CreateComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    if (userId != req.user.id) {
      return res.json({
        success: false,
        msg: "You are not allowed to create this comment..!!",
      });
    }

    const newComment = new Comment({ userId, postId, content });
    await newComment.save();

    res.json({ success: true, msg: "Comment posted.!!", comment: newComment });
  } catch (error) {
    console.log(error);
  }
};

const GetPostComment = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreateComment,
  GetPostComment,
};
