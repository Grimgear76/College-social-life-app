// src/components/PostCard.jsx
import React from 'react';

const PostCard = ({ user, content }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <strong>{user}</strong>
      <p style={{ marginTop: '10px', fontSize: '14px' }}>{content}</p>
    </div>
  );
};

export default PostCard;
