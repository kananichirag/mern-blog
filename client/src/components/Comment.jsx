import React, { useEffect, useState } from "react";
import moment from "moment";

function Comment({ comm }) {
  const [user, setUser] = useState({});
  console.log(user);
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
  }, []);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profile}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comm.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comm.content}</p>
      </div>
    </div>
  );
}

export default Comment;
