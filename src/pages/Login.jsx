import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- get login() from AuthContext

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);

      // save in localStorage (for reloads)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // IMPORTANT: update context so Navbar knows we are logged in
      login(data.token, data.role);

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  // ---------- inline styles ----------
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
    backgroundColor: "#2563eb",
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
        <h1 style={titleStyle}>Login</h1>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        <p style={smallTextStyle}>
          Don&apos;t have an account?
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
