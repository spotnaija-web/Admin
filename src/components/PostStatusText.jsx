import React from 'react';

const PostStatusText = ({ publishStatus }) => {
  const statusText = publishStatus ? 'Published' : 'Not Yet Approved';
  const statusColor = publishStatus ? "text-[#2ea103]" : "text-[#d7391e]";

  return (
    <p className={`text-sm font-bold bg-white p-2 rounded ${statusColor}`}>
      {statusText}
    </p>
  );
};

export default PostStatusText;