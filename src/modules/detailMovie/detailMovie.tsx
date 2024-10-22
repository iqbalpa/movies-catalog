'use client';

import { getMovieById } from '@/api/movies.api';
import { DetailMovie } from '@/constant/detailMovie';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import BackButton from '@/components/backButton/backButton';
import Rating from '@/components/rating/rating';
import Genres from '@/components/genres/genres';
import YearRuntime from '@/components/yearRuntime/yearRuntime';
import CrewList from '@/components/crewList/crewList';
import TopCast from '@/components/topCast/topCast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Check, Plus, Trash2 } from 'lucide-react';
import { addToWatchlist, deleteFromWatchlist } from '@/api/watchlist.api';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addWatchlist, removeFromWatchlist } from '@/store/watchlistSlice';
import MyAlertDialog from '@/components/myAlertDialog/myAlertDialog';

interface IDetailMovieModule {
  id: string;
}

const DetailMovieModule: React.FC<IDetailMovieModule> = ({ id }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const [movie, setMovie] = useState<DetailMovie>();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getCookie('accessToken') as string;
  const wathclistIds = useSelector(
    (state: RootState) => state.watchlist.watchlistIds,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getMovieById(parseInt(id));
        setMovie(res);
        document.title = `${res.title} (${res.release_date.split('-')[0]})`;
      } catch (e) {
        console.log('failed to fetch movie');
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddWatchlist = async () => {
    if (!movie) return null;
    try {
      const data = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
      };
      console.log(data);
      const res = await addToWatchlist(accessToken, data);
      toast.success('Movie added to watchlist');
      dispatch(addWatchlist(res.id));
      console.log('added to watchlist');
    } catch (e) {
      toast.error('failed adding to watchlist');
      console.log('failed to add to watchlist');
    }
  };
  const handleAddedToWatchlist = () => {
    toast.success('Movie already added to watchlist');
  };
  const handleDelete = async (movieId: number) => {
    try {
      await deleteFromWatchlist(accessToken, movieId);
      dispatch(removeFromWatchlist(movieId));
      toast.success('Movie removed from watchlist');
    } catch (e) {
      console.log('Failed to remove the movie from watchlist');
      toast.error('Failed to remove the movie from watchlist');
    }
  };

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

        <div className="absolute bottom-0 z-30 flex flex-col rounded-lg px-8 pb-8 lg:left-32 lg:right-52 lg:flex-row lg:px-0">
          {/* poster */}
          <Image
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie?.title}
            width={200}
            height={500}
            className="hidden rounded-lg border border-slate-800 shadow-2xl drop-shadow-2xl lg:block"
          />

          <div className="ml-5 mt-3 flex max-h-[24rem] flex-col gap-3 overflow-hidden text-white">
            <YearRuntime
              release_date={movie.release_date}
              runtime={movie.runtime}
            />
            <h1 className="text-base font-bold md:text-xl lg:text-3xl">
              {movie.title}
            </h1>
            <p className="overflow-y-auto text-sm md:text-base">
              {movie.overview}
            </p>
            <Genres genres={movie.genres} />
            <div className="flex flex-row gap-4">
              <Rating rating={movie.vote_average} />
              {user && wathclistIds.includes(movie.id) && (
                <MyAlertDialog movieId={movie.id} handleDelete={handleDelete}>
                  <div className="flex flex-row items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-sm font-bold text-black duration-150 hover:scale-105 hover:cursor-pointer hover:bg-red-600 md:px-4 md:text-base">
                    <Trash2 />
                    <p className="">Remove from watchlist</p>
                  </div>
                </MyAlertDialog>
              )}
              {user && !wathclistIds.includes(movie.id) && (
                <button
                  onClick={handleAddWatchlist}
                  className="flex flex-row items-center gap-2 rounded-xl bg-yellow-500 px-3 py-2 text-sm font-bold text-black duration-150 hover:scale-105 hover:cursor-pointer hover:bg-yellow-600 md:px-4 md:text-base"
                >
                  <Plus />
                  <p className="">Add to watchlist</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <CrewList job="Director" crew={movie.credits.crew} />
      <CrewList job="Writer" crew={movie.credits.crew} />
      <TopCast cast={movie.credits.cast} />
    </div>
  );
};

export default DetailMovieModule;
