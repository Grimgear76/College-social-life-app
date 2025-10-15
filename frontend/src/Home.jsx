import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "./components/PostCard";
import "./style.css";
import "./components/Beams.css";
import Beams from "./components/Beams.jsx";

const Home = () => {
  const [feed] = useState([]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
    >
      
      <Beams beamNumber={12} speed={2} rotation={45} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "90%",
          maxWidth: "700px",
          background: "rgba(0, 0, 0, 0.35)", 
          borderRadius: "20px",
          padding: "40px 30px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          animation: "fadeIn 1.2s ease-out",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "20px",
            background: "linear-gradient(90deg, #ffffff, #b3e5fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          College Connect
        </h1>

        <p
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#e0e0e0",
            marginBottom: "30px",
          }}
        >
          Meet new students, share your thoughts, and join the campus Community
        </p>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Link
            to="/posts"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#000",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b3e5fc")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffffff")}
          >
             Explore Posts
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {feed.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#ccc",
                fontSize: "1rem",
                fontStyle: "italic",
              }}
            >
            Share something on campus!
            </p>
          ) : (
            feed.map((post) => (
              <PostCard key={post.id} user={post.user} content={post.content} />
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;
