import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Particles from "./components/Particles.jsx";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const API_URL = ""; // your backend URL

  // Fetch posts from the database
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [API_URL]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !content.trim()) return;

    const formData = new FormData();
    formData.append("user", name.trim());
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        body: formData,
      });
      const savedPost = await res.json();

      setPosts((prev) => [savedPost, ...prev]);
      setName("");
      setTitle("");
      setContent("");
      setImage(null);
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
        fontFamily: "Inter, sans-serif",
        color: "#fff",
      }}
    >
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

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

      {/* Form */}
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
          style={glassInputStyle}
        />

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={glassInputStyle}
        />

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          style={glassInputStyle}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            padding: "6px 10px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#fff",
          }}
        />

        <button
          type="submit"
          style={glassButtonStyle}
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

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ddd" }}>
            No posts yet. Be the first to share something!
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              style={glassPostStyle}
            >
              <strong>{post.user}</strong>
              <h3 style={{ margin: "8px 0" }}>{post.title}</h3>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              )}
              <p style={{ marginTop: "8px", fontSize: "15px" }}>
                {post.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles
const glassInputStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  fontSize: "16px",
  outline: "none",
  color: "#fff",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

const glassButtonStyle = {
  backgroundColor: "#90caf9",
  color: "#000",
  border: "none",
  padding: "10px 0",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background-color 0.3s",
};

const glassPostStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  borderRadius: "12px",
  padding: "20px",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
};

export default Posts;
