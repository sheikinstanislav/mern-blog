import React from "react";

export const CommentItem = ({ comment }) => {
  const avatar = comment.comment.trim().toUpperCase().split("").slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full h-10 w-10 bg-blue-300 text-sm">
        {avatar}
      </div>
      <div className="flex text-gray-300 text-[10px]">{comment.comment}</div>
    </div>
  );
};
