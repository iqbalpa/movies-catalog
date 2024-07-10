'use client';

import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { Movie } from '@/constant/movie';
import Image from 'next/image';

const HomeModule: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [backdrop, setBackdrop] = useState<string>('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res: Movie[] = await api.getAllMovies();
        console.log(res);
        setMovies(res);
        setBackdrop(
          `https://image.tmdb.org/t/p/original${res[2].backdrop_path}`,
        );
        setMovie(res[2]);
        console.log(backdrop);
      } catch (e) {
        console.log('failed to fetch the movies');
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-sky-300">
      {/* Header */}
      <div className="fixed z-30 h-16 w-full bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-white">Movies Catalog</h1>
      </div>

      {/* Backdrop */}
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
      {/* <div className="relative mt-16 h-[28rem] w-full">
        <p className="text-3xl font-bold text-white">{movie?.title}</p>
        <Image
          src={backdrop}
          alt="backdrop-image"
          layout="fill"
          objectFit="cover"
        />
      </div> */}
      <div className="mt-16 flex flex-col gap-2 p-2">
        {movies.map((movie, index) => (
          <p key={movie.id}>
            {movie.title} ({movie.release_date})
          </p>
        ))}
      </div>
    </div>
  );
};

export default HomeModule;
