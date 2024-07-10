import React from 'react';
import Image from 'next/image';
import { Movie } from '@/constant/movie';

interface IListMovies {
  movies: Movie[];
}

const baseUrl = 'https://image.tmdb.org/t/p/original';

const ListMovies: React.FC<IListMovies> = ({ movies }) => {
  return (
    <div className="grid grid-cols-4 gap-5 px-28 py-10">
      {movies.map((movie, index) => (
        <div className="relative w-[300px] overflow-hidden rounded-xl bg-slate-300">
          <div className="absolute inset-0 z-10 bg-black bg-opacity-20"></div>
          <div className="absolute left-0 top-0 z-20 w-full p-4 text-center text-white">
            <p className="font-bold">
              {movie.title} ({movie?.release_date.split('-')[0]})
            </p>
          </div>
          <Image
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={50}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ListMovies;
