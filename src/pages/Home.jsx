import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPhotos } from "../api/api";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";

  useEffect(() => {
    async function load() {
      try {
        const data = await getPhotos(search);
        setPhotos(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load photos");
      }
    }
    load();
  }, [search]);

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Photos</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="photo-grid">
        {photos.map((p) => (
          <PhotoCard key={p.id} photo={p} />
        ))}
      </div>
    </div>
  );
}
