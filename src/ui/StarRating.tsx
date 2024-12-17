type StarRatingProps = {
  maxStars?: number; // Default to 5 stars if not provided
  initialRating?: number; // Initial rating value
};

export default function StarRating({
  maxStars = 5,
  initialRating = 0,
}: StarRatingProps) {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            style={{
              fontSize: "20px",
              color: initialRating >= starIndex ? "#ffc107" : "#e4e5e9",
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
