'use client';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { deleteFromWatchlist, getWatchlist } from '@/api/watchlist.api';
import { SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

const baseUrl = 'https://image.tmdb.org/t/p/original';

const WatchlistModule = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const accessToken = getCookie('accessToken') as string;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      return;
    }
    const fetchWatchlist = async () => {
      try {
        const res = await getWatchlist(accessToken);
        setWatchlist(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchWatchlist();
  }, [user, accessToken, router]);

  const handleDelete = async (movieId: number) => {
    try {
      await deleteFromWatchlist(accessToken, movieId);
      toast.success('movie removed from watchlist');
    } catch (e) {
      console.log('failed to remove the movie from watchlist');
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-black pb-14 pt-10 text-white md:pt-20">
      {watchlist.length === 0 ? (
        <div className="flex min-h-screen w-full items-center justify-center text-xl font-semibold">
          Your watchlist is empty :{`(`}
        </div>
      ) : (
        <div className="flex w-full flex-col px-10 md:px-14">
          <h1 className="m-3 text-center text-lg font-bold md:text-xl lg:text-2xl">
            Watchlist
          </h1>
          <div className="w-full border-t-[1px] border-slate-500"></div>
          <div className="flex flex-col items-center">
            {watchlist.map((movie, index) => (
              <div
                key={movie.id}
                className="flex w-full flex-col items-center gap-3 border-b-[1px] border-slate-500 p-2 py-4 md:flex-row md:py-8"
              >
                <Image
                  src={`${baseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  width={120}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex w-full flex-col gap-1">
                  <p className="text-center text-sm font-semibold md:text-left md:text-base">
                    {movie.title} ({movie.release_date.split('-')[0]})
                  </p>
                  <p className="hidden text-xs md:block md:text-sm">
                    {movie.overview}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-2 md:flex-col">
                  <Link
                    href={`/${movie.id}`}
                    target="_blank"
                    className="rounded-md p-1 duration-150 hover:cursor-pointer hover:bg-slate-200 hover:bg-opacity-15"
                  >
                    <SquareArrowOutUpRight />
                  </Link>
                  {/* <button
                    onClick={() => handleDelete(movie.id)}
                    className="rounded-md p-1 duration-150 hover:cursor-pointer hover:bg-red-500 hover:bg-opacity-40 hover:text-red-500"
                  >
                    <Trash2 />
                  </button> */}
                  <MyAlertDialog
                    movieId={movie.id}
                    handleDelete={handleDelete}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistModule;

interface IMyAlertDialog {
  movieId: number;
  handleDelete: (id: number) => void;
}

const MyAlertDialog: React.FC<IMyAlertDialog> = ({ movieId, handleDelete }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md p-1 duration-150 hover:cursor-pointer hover:bg-red-500 hover:bg-opacity-40 hover:text-red-500">
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(movieId)}
            className="bg-red-500 hover:bg-red-500 hover:bg-opacity-85"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
