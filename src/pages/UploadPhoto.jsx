import { useState } from "react";
import { uploadPhoto } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function UploadPhoto() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------- access control ----------
  if (!user) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f7",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff7ed",
            border: "1px solid #fed7aa",
            padding: "20px 24px",
            borderRadius: "8px",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: "#9a3412",
          }}
        >
          You must be logged in to upload photos.
        </div>
      </div>
    );
  }

  if (user.role !== "creator") {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f7",
        }}
      >
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            padding: "20px 24px",
            borderRadius: "8px",
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: "#b91c1c",
          }}
        >
          Only <strong>creator</strong> accounts can upload photos.
        </div>
      </div>
    );
  }

  // ---------- upload handler ----------
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please choose a photo to upload.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("photo", file);

      await uploadPhoto(formData, token);

      setSuccess("Photo uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      // also clear the file input element if needed
      e.target.reset();
    } catch (err) {
      setError("Failed to upload photo.");
    }
  }

  // ---------- inline styles ----------
  const pageStyle = {
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f5f5f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "60px",
    paddingBottom: "40px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "28px 32px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.12)",
    border: "1px solid #e5e7eb",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const titleStyle = {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
    color: "#111827",
  };

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "vertical",
    minHeight: "80px",
  };

  const fileInputStyle = {
    width: "100%",
    padding: "6px 0",
    fontSize: "14px",
  };

  const fieldWrapperStyle = {
    marginBottom: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px 14px",
    marginTop: "4px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "#b91c1c",
    marginBottom: "12px",
    fontSize: "14px",
    textAlign: "center",
  };

  const successStyle = {
    color: "#15803d",
    marginBottom: "12px",
    fontSize: "14px",
    textAlign: "center",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Upload Photo</h1>

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <div style={fieldWrapperStyle}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sunset at the beach"
            />
          </div>

          <div style={fieldWrapperStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={textareaStyle}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of your photo"
            />
          </div>

          <div style={fieldWrapperStyle}>
            <label style={labelStyle}>Photo file</label>
            <input
              type="file"
              accept="image/*"
              style={fileInputStyle}
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
