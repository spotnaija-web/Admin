import React from 'react';

const PostStatusText = ({ publishStatus }) => {
  const statusText = publishStatus ? 'Published' : 'Not Yet Approved';
  const statusColor = publishStatus ? 'green' : 'red';

  return (
    <p className={`text-sm font-bold bg-white p-2 rounded text-${statusColor}-500`}>
      {statusText}
    </p>
  );
};

export default PostStatusText;