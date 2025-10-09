import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import './style.css';
import './components/Beams.css';
import Beams from './components/Beams.jsx';

const Home = () => {
  const [newPost, setNewPost] = useState('');
  const [feed, setFeed] = useState([
    { id: 1, user: 'Alice', content: 'Just finished my calculus homework!' },
    { id: 2, user: 'Bob', content: 'Anyone up for intramural soccer this weekend?' },
  ]);

  const handlePost = () => {
    if (newPost.trim() === '') return;
    const post = { id: feed.length + 1, user: 'You', content: newPost };
    setFeed([post, ...feed]);
    setNewPost('');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Full-page Beams background rotated 45 degrees */}
      <Beams beamNumber={12} speed={2} rotation={45} />

      {/* Foreground content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#fff' }}>College Social Feed</h1>
        <Link
          to="/posts"
          style={{ marginBottom: '20px', display: 'inline-block', color: '#fff' }}
        >
          Go to Posts Page
        </Link>

        <div style={{ marginBottom: '20px' }}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            rows="3"
            style={{ width: '100%', padding: '10px', fontSize: '14px' }}
          />
          <button
            onClick={handlePost}
            style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
          >
            Post
          </button>
        </div>

        <div>
          {feed.map((post) => (
            <Posts key={post.id} user={post.user} content={post.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
