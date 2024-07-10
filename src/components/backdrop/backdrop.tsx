import { Movie } from '@/constant/movie';
import React from 'react';
import Image from 'next/image';

interface IBackdrop {
  movie: Movie;
  backdrop: string;
}

const Backdrop: React.FC<IBackdrop> = ({ movie, backdrop }) => {
  return (
    <div className="relative mt-16 h-[28rem] w-full">
      <div className="absolute inset-0 z-20 bg-black bg-opacity-30"></div>
      <div className="absolute bottom-0 left-0 z-20 p-4 px-60 text-white">
        <p className="mb-2 text-2xl font-bold">
          {movie?.title} ({movie?.release_date.split('-')[0]})
        </p>
        <p>{movie?.overview}</p>
      </div>
      <Image
        src={backdrop}
        alt="backdrop-image"
        layout="fill"
        objectFit="cover"
        className="z-10"
      />
    </div>
  );
};

export default Backdrop;
