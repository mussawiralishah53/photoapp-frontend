import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
  if (!photo) return null;

  return (
    <div className="photo-card">
      <Link to={`/photo/${photo.id}`}>
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="photo-img"
        />
        <h3 className="photo-title">{photo.title}</h3>
      </Link>
      <p className="photo-desc">{photo.caption || "No description"}</p>
    </div>
  );
}
