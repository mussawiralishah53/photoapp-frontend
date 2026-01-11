import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  }

  // ---------- Inline styles ----------
  const pageStyle = {
    minHeight: "calc(100vh - 60px)",
    backgroundColor: "#f5f5f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "80px",
    paddingBottom: "40px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "32px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.15)",
    border: "1px solid #e5e7eb",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "24px",
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
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  };

  const inputWrapperStyle = {
    marginBottom: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px 14px",
    marginTop: "8px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "#dc2626",
    marginBottom: "12px",
    fontSize: "14px",
    textAlign: "center",
  };

  const smallTextStyle = {
    marginTop: "16px",
    fontSize: "13px",
    color: "#4b5563",
    textAlign: "center",
  };

  const linkStyle = {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
    marginLeft: "4px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Register</h1>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              style={inputStyle}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Your name"
            />
          </div>

          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              style={inputStyle}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="you@example.com"
            />
          </div>

          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={inputStyle}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div style={inputWrapperStyle}>
            <label style={labelStyle}>Role</label>
            <select
              style={inputStyle}
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="viewer">Viewer</option>
              <option value="creator">Creator</option>
            </select>
          </div>

          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p style={smallTextStyle}>
          Already have an account?
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
