import "./App.css";             // ⬅️ THIS LINE BRINGS BACK YOUR STYLES

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UploadPhoto from "./pages/UploadPhoto.jsx";
import PhotoDetails from "./pages/PhotoDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadPhoto />} />   {/* upload is NOT wrapped */}
        <Route path="/photo/:id" element={<PhotoDetails />} />
      </Routes>
    </div>
  );
}
