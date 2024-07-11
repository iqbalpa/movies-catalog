import React, { useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/constant/movie';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

interface ICard {
  movie: Movie;
}

const baseUrl = 'https://image.tmdb.org/t/p/original';

const Card: React.FC<ICard> = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={`/${movie.id}`}
      className="relative h-[450px] w-[300px] overflow-hidden rounded-xl duration-300 hover:scale-105 hover:cursor-pointer"
    >
      <div className="absolute inset-0 z-10 bg-black bg-opacity-20"></div>
      <div className="absolute left-0 top-0 z-20 w-full p-4 text-center text-white">
        {movie.release_date ? (
          <p className="font-bold">
            {movie.title} ({movie?.release_date.split('-')[0]})
          </p>
        ) : (
          <p className="font-bold">{movie.title}</p>
        )}
      </div>
      {isLoading && <Skeleton className="absolute inset-0 h-full w-full" />}
      <Image
        src={`${baseUrl}${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className={`object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadingComplete={() => setIsLoading(false)}
        onLoad={() => setIsLoading(false)}
      />
    </Link>
  );
};

export default Card;
