import React from 'react';
import Image from 'next/image';
import { Movie } from '@/constant/movie';
import Card from '@/components/card/card';

interface IListMovies {
  movies: Movie[];
}

const ListMovies: React.FC<IListMovies> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 gap-3 py-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:px-28">
      {movies.map((movie, index) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default ListMovies;
