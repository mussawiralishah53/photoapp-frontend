// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UploadPhoto from "./pages/UploadPhoto.jsx";
import PhotoDetails from "./pages/PhotoDetails";
import "./App.css";

function loadUserFromStorage() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  if (!token || !email || !role) return null;
  return { token, email, role };
}

function ProtectedRoute({ user, children, requireCreator = false }) {
  if (!user) return <Navigate to="/login" replace />;
  if (requireCreator && user.role !== "creator") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = loadUserFromStorage();
    if (u) setUser(u);
  }, []);

  function handleLogin(data) {
    // data = { token, role, email }
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    setUser({ token: data.token, email: data.email, role: data.role });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUser(null);
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute user={user} requireCreator>
                <UploadPhoto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photos/:id"
            element={<PhotoDetails user={user} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
