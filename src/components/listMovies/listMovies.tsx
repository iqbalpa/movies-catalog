import React from 'react';
import Image from 'next/image';
import { Movie } from '@/constant/movie';
import Card from '@/components/card/card';

interface IListMovies {
  movies: Movie[];
}

const ListMovies: React.FC<IListMovies> = ({ movies }) => {
  return (
    <div className="grid grid-cols-4 gap-5 px-28 py-10">
      {movies.map((movie, index) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default ListMovies;
