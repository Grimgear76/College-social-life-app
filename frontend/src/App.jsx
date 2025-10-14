import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import './components/Beams.css';
import Beams from './components/Beams.jsx';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


function App() {
  return (
    <div>
     <nav className="navbar">
             <Link to="/" className="nav-link">Home</Link>
             <Link to="/posts" className="nav-link">Posts</Link>
           </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default App;
