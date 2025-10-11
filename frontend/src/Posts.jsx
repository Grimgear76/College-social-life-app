import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./components/Beams.css";
import Beams from "./components/Beams.jsx";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // Loads API URL from .env (frontend/.env)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  console.log("API URL:", API_URL);

  // Fetch posts when the component loads
  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [API_URL]);

  // Handle submitting a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newPost = { user: name.trim(), content: content.trim() };

    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const savedPost = await res.json();

      setPosts([savedPost, ...posts]);
      setName("");
      setContent("");
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "40px 20px",
        maxWidth: "700px",
        margin: "0 auto",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Beams beamNumber={12} speed={2} rotation={45} />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Community Posts
        </h1>
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "30px",
            color: "#90caf9",
            textDecoration: "none",
          }}
        >
          ⬅ Back to Home
        </Link>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              resize: "none",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#90caf9",
              color: "#000",
              border: "none",
              padding: "10px 0",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#64b5f6")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#90caf9")
            }
          >
            Post
          </button>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#ddd" }}>
              No posts yet. Be the first to share something!
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#000",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <strong>{post.user}</strong>
                <p style={{ marginTop: "8px", fontSize: "15px" }}>
                  {post.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
