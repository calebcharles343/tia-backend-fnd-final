import { useState } from "react";

type StarRatingProps = {
  maxStars?: number; // Default to 5 stars if not provided
  initialRating?: number; // Initial rating value
  onRatingChange?: (rating: number) => void; // Callback when the rating changes
};

export default function StarRating({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHover(index);
  const handleMouseLeave = () => setHover(null);
  const handleClick = (index: number) => {
    setRating(index);
    if (onRatingChange) onRatingChange(index); // Trigger the callback
  };

  return (
    <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            style={{
              fontSize: "20px",
              color:
                hover !== null
                  ? hover >= starIndex
                    ? "#ffc107"
                    : "#e4e5e9"
                  : rating >= starIndex
                  ? "#ffc107"
                  : "#e4e5e9",
              transition: "color 0.2s",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
