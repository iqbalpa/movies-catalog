import React from 'react';
import { Genre } from '@/constant/detailMovie';

interface IGenres {
  genres: Genre[];
}

const Genres: React.FC<IGenres> = ({ genres }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="rounded-full bg-slate-700 bg-opacity-80 px-3 py-1 md:px-4 md:py-2"
        >
          <p className="text-sm md:text-base">{genre.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Genres;
