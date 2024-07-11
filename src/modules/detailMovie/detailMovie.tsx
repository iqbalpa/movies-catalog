'use client';

import api from '@/api/api';
import { DetailMovie } from '@/constant/detailMovie';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import BackButton from '@/components/backButton/backButton';
import Rating from '@/components/rating/rating';
import Genres from '@/components/genres/genres';
import YearRuntime from '@/components/yearRuntime/yearRuntime';
import CrewList from '@/components/crewList/crewList';

interface IDetailMovieModule {
  id: string;
}

const DetailMovieModule: React.FC<IDetailMovieModule> = ({ id }) => {
  const [movie, setMovie] = useState<DetailMovie>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.getMovieById(parseInt(id));
        setMovie(res);
        document.title = `${res.title} (${res.release_date.split('-')[0]})`;
      } catch (e) {
        console.log('failed to fetch movie');
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return;
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* backdrop */}
      <div className="relative h-[36rem] w-full">
        <BackButton />
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent to-black"></div>
        {isLoading && (
          <Skeleton className="absolute inset-0 z-30 h-full w-full" />
        )}
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt="backdrop-image"
          layout="fill"
          objectFit="cover"
          className={`z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
        />

        {movie && (
          <div className="absolute bottom-0 left-32 right-52 z-30 flex flex-row rounded-lg pb-8">
            {/* poster */}
            <Image
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie?.title}
              width={200}
              height={500}
              className="rounded-lg border border-slate-800 shadow-2xl drop-shadow-2xl"
            />

            <div className="ml-5 mt-3 flex max-h-[24rem] flex-col gap-3 overflow-hidden text-white">
              <YearRuntime
                release_date={movie.release_date}
                runtime={movie.runtime}
              />
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p className="overflow-y-auto">{movie.overview}</p>
              <Genres genres={movie.genres} />
              <Rating rating={movie.vote_average} />
            </div>
          </div>
        )}
      </div>

      <CrewList job="Director" crew={movie.credits.crew} />
      <CrewList job="Writer" crew={movie.credits.crew} />

      {/* casts */}
      <div className="flex flex-col items-center justify-center px-10 py-5 text-white">
        <h1 className="text-3xl font-bold">Top Casts</h1>
        <div className="mt-8 grid grid-cols-4 grid-rows-3 gap-4">
          {movie.credits.cast.slice(0, 12).map((cast, index) => (
            <div className="flex flex-row items-center gap-2">
              <Image
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
                width={100}
                height={100}
                className="rounded-xl"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{cast.name}</p>
                <p className="text-slate-300">{cast.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailMovieModule;
