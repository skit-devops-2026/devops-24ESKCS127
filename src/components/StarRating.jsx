import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating, reviews, showCount = true, size = "sm" }) => {
  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5"
  };

  const currentSize = iconSizes[size] || iconSizes.sm;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillAmount = Math.max(0, Math.min(1, rating - (star - 1)));
          return (
            <div key={star} className="relative">
              <Star className={`${currentSize} text-slate-200 fill-slate-200`} />
              {fillAmount > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden text-amber-400 fill-amber-400"
                  style={{ width: `${fillAmount * 100}%` }}
                >
                  <Star className={`${currentSize}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs font-semibold text-slate-700">{rating}</span>
      {showCount && reviews !== undefined && (
        <span className="text-xs text-slate-400">({reviews})</span>
      )}
    </div>
  );
};
