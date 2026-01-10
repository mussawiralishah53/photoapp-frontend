import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPhotoDetails } from "../api/api";

export default function PhotoDetails() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getPhotoDetails(id);
        setPhoto(data.photo);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load photo details");
      }
    }
    load();
  }, [id]);

  if (error) {
    return <div style={{ padding: 24, color: "red" }}>{error}</div>;
  }

  if (!photo) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{photo.title}</h1>
      <img
        src={photo.imageUrl}
        alt={photo.title}
        style={{ maxWidth: "100%", borderRadius: 8, marginTop: 16 }}
      />
      <p style={{ marginTop: 12 }}>{photo.caption || "No description"}</p>

      {/* Open real image URL in a new tab */}
      <p style={{ marginTop: 16 }}>
        <a href={photo.imageUrl} target="_blank" rel="noreferrer">
          Open original image in new tab
        </a>
      </p>
    </div>
  );
}
