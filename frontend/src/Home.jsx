import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './components/PostCard';
import './style.css';
import './components/Beams.css';
import Beams from './components/Beams.jsx';


const Home = () => {
  const [feed] = useState([]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Full-page Beams background rotated 45 degrees */}
      <Beams beamNumber={12} speed={2} rotation={45} />


      {/* Foreground content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '30px',
          maxWidth: '600px',
          margin: '20px auto',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
           College Social Feed
        </h1>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Link to="/posts" className="styled-link">
            Go to Posts Page
          </Link>
        </div>

        <div>
          {feed.map((post) => (
            <PostCard key={post.id} user={post.user} content={post.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
