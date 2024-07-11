import { Movie } from '@/constant/movie';
import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

interface IBackdrop {
  movie: Movie;
  backdrop: string;
}

const Backdrop: React.FC<IBackdrop> = ({ movie, backdrop }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-[32rem] w-full">
      <div className="absolute inset-0 z-20 bg-black bg-opacity-30"></div>
      <div className="absolute bottom-0 left-0 z-20 p-4 px-60 text-white">
        <p className="mb-2 text-2xl font-bold">
          {movie?.title} ({movie?.release_date.split('-')[0]})
        </p>
        <p>{movie?.overview}</p>
      </div>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-30 h-full w-full" />
      )}
      <Image
        src={backdrop}
        alt="backdrop-image"
        layout="fill"
        objectFit="cover"
        className={`z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Backdrop;
