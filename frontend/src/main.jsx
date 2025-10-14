import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* 👈 wrap App here */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
