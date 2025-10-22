import React, { useState, useEffect } from "react";
import Particles from "./components/Particles";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const API_URL = "";

  // Fetches posts
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

  // Handles the  image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handles submit for our form
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
      setPreviewImage(null);
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Particle Background Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
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
      </div>

      {/*Our Foreground Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Community Posts
        </h1>

        {/* Form */}
        <div
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
            onChange={handleImageChange}
            style={{
              padding: "6px 10px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
          />

          {/* Preview */}
          {previewImage && (
            <div style={{ position: "relative" }}>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
              <button
                onClick={() => {
                  setImage(null);
                  setPreviewImage(null);
                }}
                style={removeButtonStyle}
              >
                ×
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={glassButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#64b5f6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#90caf9")}
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#ddd" }}>
              No posts yet. Be the first to share something!
            </p>
          ) : (
            posts.map((post) => (
              <div key={post._id} style={glassPostStyle}>
                <strong>{post.user}</strong>
                <h3 style={{ margin: "8px 0" }}>{post.title}</h3>
                {post.image && (
                  <img
                    src={
                      post.image.startsWith("http")
                        ? post.image
                        : `${API_URL}${post.image}`
                    }
                    alt={post.title}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginTop: "10px",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
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
    </div>
  );
};

// Styles for our glass effect
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

const removeButtonStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  fontSize: "18px",
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
};

export default Posts;
