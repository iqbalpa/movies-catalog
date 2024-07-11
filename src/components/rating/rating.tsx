import { Star } from 'lucide-react';
import React from 'react';

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Star className="text-yellow-300" fill="yellow" />
      <p className="text-sm text-slate-400">
        <span className="text-lg font-bold text-white">
          {rating.toFixed(1)}
        </span>
        /10
      </p>
    </div>
  );
};

export default Rating;
