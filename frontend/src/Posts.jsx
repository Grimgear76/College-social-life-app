import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';


const Posts = ({ user, content }) => {
  // Example static posts if coming directly to this page
  const posts = [
    { id: 1, user: 'Charlie', content: 'Excited for the spring festival!' },
    { id: 2, user: 'Dana', content: 'Looking for a study buddy in physics.' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Posts Page</h1>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        Back to Home
      </Link>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <strong>{post.user}</strong>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;