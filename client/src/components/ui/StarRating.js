import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating, bookId, totalBookRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, key) => {
        const ratingValue = key + 1;
        const yellowStars = rating.find((item) => item.bookId === bookId);

        return (
          <label>
            <input
              id={key}
              type="radio"
              name="rating"
              value={rating.filter((item) => item.bookId == bookId).rating}
              onClick={() =>
                setRating([
                  ...rating,
                  {
                    bookId: bookId,
                    rating: ratingValue,
                  },
                ])
              }
            />
            <FaStar
              // key={key}
              className="star"
              color={
                ratingValue <= (yellowStars && yellowStars.rating)
                  ? "#ffc107"
                  : ratingValue >= (yellowStars && yellowStars.rating)
                  ? "#e4e5e9"
                  : ratingValue <= totalBookRating
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
