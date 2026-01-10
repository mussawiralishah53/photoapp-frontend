import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { uploadPhoto } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function UploadPhoto() {
  const { user } = useAuth();
  if (!user) {
    return <div className="text-center mt-10 text-red-600">Login required.</div>;
  }


  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // BLOCK non-creators
  if (user.role !== "creator") {
    return <div className="text-center mt-10 text-red-600">Creators only.</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select a photo to upload");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo", file);

    try {
      await uploadPhoto(formData, token);
      setSuccess("Photo uploaded successfully!");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError("Upload failed — check server logs");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload New Photo</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Photo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
