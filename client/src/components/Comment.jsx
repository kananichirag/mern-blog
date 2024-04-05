import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

function Comment({ comm, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await fetch(`/v1/user/${comm.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [comm]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profile}
          alt="image"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {`@${user.username}`}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comm.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comm.content}</p>

        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comm._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comm.likes.includes(currentUser.user._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comm.numberoflikes > 0 &&
              comm.numberoflikes +
                " " +
                (comm.numberoflikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
