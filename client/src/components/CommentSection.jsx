import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Comment from "./Comment";

function CommentSection({ post }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch(`/v1/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId: post._id,
          userId: currentUser.user._id,
        }),
      });
      const data = await res.json();
      if (data.success == true) {
        toast.success(data.msg);
        setComment("");
        setComments([data, ...comments]);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/v1/comment/getcomment/${post._id}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/v1/comment/likecomment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        toast.success("Post Liked.!!");
        setComments(
          comment.map((comment) => {
            comment._id == commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberoflikes: data.likes.length,
                }
              : comment;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.user.profile}
          />
          <Link
            className="text-xl text-cyan-600 hover:underline"
            to="/dashboard?tab=profile"
          >
            @{currentUser.user.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed to comment.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            rows={3}
            placeholder="Add a comment..."
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex  justify-between items-center mt-5 ">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} charaters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No Comment yet..!!</p>
      ) : (
        <div>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comm) => (
            <Comment key={comm._id} comm={comm} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
