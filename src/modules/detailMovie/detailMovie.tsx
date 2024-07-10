'use client';

import api from '@/api/api';
import { DetailMovie } from '@/constant/detailMovie';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IDetailMovieModule {
  id: string;
}

const DetailMovieModule: React.FC<IDetailMovieModule> = ({ id }) => {
  const router = useRouter();
  const [movie, setMovie] = useState<DetailMovie>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.getMovieById(parseInt(id));
        setMovie(res);
        document.title = res.title;
      } catch (e) {
        console.log('failed to fetch movie');
      }
    };
    fetchMovie();
  }, [id]);

  const handleBack = () => router.push('/');

  return (
    <div className="">
      <div className="relative mt-16 h-[30rem] w-full">
        <button
          onClick={handleBack}
          className="absolute left-5 top-5 z-50 flex flex-row gap-2 rounded-full bg-slate-600 bg-opacity-80 px-5 py-3 text-white duration-100 hover:scale-105 hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-95"
        >
          <CircleArrowLeft />
          <p>Back</p>
        </button>
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
          <div className="absolute -bottom-12 left-32 right-52 z-30 flex flex-row rounded-lg">
            {/* poster */}
            <Image
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie?.title}
              width={200}
              height={500}
              className="rounded-lg border border-slate-800 shadow-2xl drop-shadow-2xl"
            />
            {/* year, title, overview, genres */}
            <div className="ml-5 mt-3 flex flex-col gap-3 text-white">
              <p className="ml-2 text-xl font-bold">
                {movie.release_date.split('-')[0]}
              </p>
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p>{movie.overview}</p>
              <div className="mt-2 flex flex-row gap-2">
                {movie.genres.map((genre, index) => (
                  <div
                    key={genre.id}
                    className="rounded-full bg-slate-700 bg-opacity-80 px-4 py-2"
                  >
                    <p>{genre.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <h1>hello from detail movie page {id}</h1>
    </div>
  );
};

export default DetailMovieModule;
