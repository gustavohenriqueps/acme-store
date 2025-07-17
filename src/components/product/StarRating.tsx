// components/ui/StarRating.tsx
import { Star } from "lucide-react";
import React from "react";

type StarRatingProps = {
  rate: number;
  totalStars?: number; // padrão 5
  starClassName?: string;
  emptyStarClassName?: string;
};

const StarRating = ({
  rate,
  totalStars = 5,
  starClassName = "text-yellow-400 size-5",
  emptyStarClassName = "text-gray-200 size-5",
}: StarRatingProps) => {
  const roundedRate = Math.round(rate);
  return (
    <div className="flex items-center gap-1">
      {Array(roundedRate)
        .fill(0)
        .map((_, i) => (
          <Star
            key={`full-${i}`}
            fill="currentColor"
            stroke="none"
            className={starClassName}
          />
        ))}
      {Array(totalStars - roundedRate)
        .fill(0)
        .map((_, i) => (
          <Star
            key={`empty-${i}`}
            fill="currentColor"
            className={emptyStarClassName}
          />
        ))}
    </div>
  );
};

export default StarRating;
