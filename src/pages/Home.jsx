import { useEffect, useState } from "react";
import { getPhotos } from "../api/api";
import PhotoCard from "../components/PhotoCard";

export default function Home() {
  const [photos, setPhotos] = useState([]);

  async function load() {
    const data = await getPhotos();
    setPhotos(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "40px 20px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        Latest Photos
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {photos.map((p) => (
          <PhotoCard key={p.id} photo={p} />
        ))}
      </div>
    </div>
  );
}
