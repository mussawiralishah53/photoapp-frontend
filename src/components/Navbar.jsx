import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    if (e.key === "Enter") {
      navigate("/?search=" + query);
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">PhotoApp</Link>

        <input
          type="text"
          className="search"
          placeholder="Search photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/upload">Upload</Link>
            <button
              className="logout"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
