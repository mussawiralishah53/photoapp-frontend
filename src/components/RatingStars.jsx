// src/components/RatingStars.jsx
export default function RatingStars({ value, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="rating-stars">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          className={s <= value ? "star active" : "star"}
          onClick={() => onChange(s)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
