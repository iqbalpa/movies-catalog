import React from 'react';
import { Genre } from '@/constant/detailMovie';

interface IGenres {
  genres: Genre[];
}

const Genres: React.FC<IGenres> = ({ genres }) => {
  return (
    <div className="flex flex-row gap-2">
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="rounded-full bg-slate-700 bg-opacity-80 px-4 py-2"
        >
          <p>{genre.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Genres;
