// src/pages/PhotoDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getPhotoDetails,
  getRatings,
  addRating,
  getComments,
  addComment,
} from "../api/api";
import RatingStars from "../components/RatingStars.jsx";

export default function PhotoDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const token = user?.token || null;

  const [photo, setPhoto] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);

  const [score, setScore] = useState(5);
  const [commentText, setCommentText] = useState("");
  const [ratingComment, setRatingComment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const [ratingsError, setRatingsError] = useState("");
  const [commentsError, setCommentsError] = useState("");

  // ---------- STYLES ----------
  const pageStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 16px 40px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
    padding: "18px 22px",
    marginBottom: "24px",
  };

  const heroCardStyle = {
    ...cardStyle,
    padding: 0,
    overflow: "hidden",
  };

  const heroBodyStyle = {
    padding: "18px 22px 20px",
  };

  const headingStyle = {
    margin: "0 0 12px",
    fontSize: "26px",
    fontWeight: 700,
    color: "#0f172a",
  };

  const captionStyle = {
    margin: "0 0 8px",
    fontSize: "15px",
    color: "#374151",
  };

  const metaStyle = {
    fontSize: "13px",
    color: "#6b7280",
  };

  const smallWarnStyle = {
    fontSize: "13px",
    color: "#b91c1c",
    marginBottom: "6px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  };

  const textareaStyle = {
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    padding: "8px 10px",
    fontSize: "14px",
    resize: "vertical",
    minHeight: "70px",
    boxSizing: "border-box",
  };

  const buttonStyle = (disabled) => ({
    backgroundColor: disabled ? "#9ca3af" : "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "999px",
    padding: "8px 18px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: disabled ? "default" : "pointer",
    marginTop: "6px",
  });

  const commentItemStyle = {
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    padding: "8px 10px",
  };

  // ---------- LOAD DATA ----------
  async function loadData() {
    setLoading(true);
    setError("");
    setRatingsError("");
    setCommentsError("");

    try {
      const raw = await getPhotoDetails(id);

      // Try to handle a few possible shapes safely
      let detail;
      if (Array.isArray(raw)) {
        detail = raw[0];
      } else if (raw && typeof raw === "object") {
        detail = raw.photo || raw;
      } else {
        detail = raw;
      }

      console.log("PHOTO DETAILS FROM API:", detail);
      setPhoto(detail);
    } catch (err) {
      console.error("PHOTO LOAD ERROR:", err);
      setError(err.message || "Failed to load photo");
      setLoading(false);
      return;
    }

    // Ratings
    try {
      const r = await getRatings(id);
      setRatings(r);
    } catch (err) {
      console.error("RATINGS LOAD ERROR:", err);
      setRatingsError("");
    }

    // Comments
    try {
      const c = await getComments(id);
      setComments(c);
    } catch (err) {
      console.error("COMMENTS LOAD ERROR:", err);
      setCommentsError("");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [id]);

  // ---------- ADD RATING ----------
  async function handleAddRating(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in to rate.");
      return;
    }

    try {
      await addRating(id, score, ratingComment, token);
      setSuccess("Rating added");
      setRatingComment("");
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Rating Added");
    }
  }

  // ---------- ADD COMMENT ----------
  async function handleAddComment(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }

    if (!commentText.trim()) {
      setError("Comment text required");
      return;
    }

    try {
      await addComment(id, commentText, token);
      setSuccess("Comment added");
      setCommentText("");
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Comment Added");
    }
  }

  // ---------- RENDER STATES ----------
  if (loading && !photo) {
    return (
      <div style={pageStyle}>
        <p>Loading photo...</p>
      </div>
    );
  }

  if (!photo) {
    return (
      <div style={pageStyle}>
        <p style={{ color: "#b91c1c", fontWeight: 600 }}>
          Failed to load photo.
          <br />
          {error}
        </p>
      </div>
    );
  }

  const avgRating =
    ratings && ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + (r.score || 0), 0) /
          ratings.length
        ).toFixed(1)
      : null;

  // Choose the image field safely
  const imageSrc =
    photo.imageUrl ||
    photo.imageURL ||
    photo.url ||
    photo.photoUrl ||
    photo.photoURL ||
    "";

  // ---------- PAGE UI ----------
  return (
    <div style={pageStyle}>
      {error && (
        <p style={{ color: "#b91c1c", marginBottom: "8px" }}>{error}</p>
      )}
      {success && (
        <p style={{ color: "#15803d", marginBottom: "8px" }}>{success}</p>
      )}

      {/* PHOTO HERO */}
      <div style={heroCardStyle}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={photo.title || "Photo"}
            style={{
              width: "100%",
              maxHeight: "420px",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
        <div style={heroBodyStyle}>
          <h1 style={headingStyle}>{photo.title || "Photo"}</h1>

          {photo.caption && (
            <p style={captionStyle}>{photo.caption}</p>
          )}

          <div style={metaStyle}>
            {photo.location && (
              <span style={{ marginRight: "16px" }}>
                📍 {photo.location}
              </span>
            )}
            {photo.people && (
              <span style={{ marginRight: "16px" }}>
                👥 {photo.people}
              </span>
            )}
          </div>

          {avgRating && (
            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <RatingStars value={Number(avgRating)} readOnly />
              <span style={{ fontSize: "13px", color: "#4b5563" }}>
                {avgRating} / 5 ({ratings.length} ratings)
              </span>
            </div>
          )}

          {imageSrc && (
            <div style={{ marginTop: "12px" }}>
              <a
                href={imageSrc}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "13px", color: "#4f46e5" }}
              >
                Open original image in new tab
              </a>
            </div>
          )}
        </div>
      </div>

      {/* small warnings under hero */}
      {ratingsError && <p style={smallWarnStyle}>{ratingsError}</p>}
      {commentsError && <p style={smallWarnStyle}>{commentsError}</p>}

      {/* RATE PHOTO */}
      <div style={cardStyle}>
        <h2 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: 600 }}>
          Rate this photo
        </h2>
        {!user && (
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
            Login to add a rating.
          </p>
        )}
        <form onSubmit={handleAddRating}>
          <div style={{ marginBottom: "8px" }}>
            <RatingStars value={score} onChange={setScore} />
          </div>
          <label style={labelStyle}>Comment (optional)</label>
          <textarea
            style={textareaStyle}
            placeholder="Optional comment"
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
            disabled={!user}
          />
          <button type="submit" disabled={!user} style={buttonStyle(!user)}>
            Submit rating
          </button>
        </form>
      </div>

      {/* ADD COMMENT */}
      <div style={cardStyle}>
        <h2 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: 600 }}>
          Add a comment
        </h2>
        {!user && (
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
            Login to add a comment.
          </p>
        )}
        <form onSubmit={handleAddComment}>
          <label style={labelStyle}>Your comment</label>
          <textarea
            style={textareaStyle}
            placeholder="Write your comment…"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={!user}
          />
          <button type="submit" disabled={!user} style={buttonStyle(!user)}>
            Submit comment
          </button>
        </form>
      </div>

      {/* COMMENTS LIST */}
      <div style={cardStyle}>
        <h2 style={{ margin: "0 0 10px", fontSize: "18px", fontWeight: 600 }}>
          Comments ({comments.length || 0})
        </h2>
        {comments.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            No comments yet.
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {comments.map((c) => (
              <li key={c.id || c._rid} style={{ marginBottom: "8px" }}>
                <div style={commentItemStyle}>
                  <p style={{ margin: 0 }}>{c.text}</p>
                  {c.createdAt && (
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "11px",
                        color: "#9ca3af",
                      }}
                    >
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
