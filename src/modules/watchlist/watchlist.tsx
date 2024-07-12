'use client';

import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { getWatchlist } from '@/api/watchlist.api';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  userId: number;
}

const WatchlistModule = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const accessToken = getCookie('accessToken') as string;

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await getWatchlist(accessToken);
        console.log('WATCHLIST');
        console.log(res);
        setWatchlist(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchWatchlist();
  }, []);

  return (
    <div className="flex min-h-screen w-full justify-center bg-black pt-20 text-white">
      {watchlist.length === 0 ? (
        <div className="flex min-h-screen w-full items-center justify-center text-xl font-semibold">
          Your watchlist is empty :{`(`}
        </div>
      ) : (
        <div className="flex flex-col px-4 md:px-10">
          <h1 className="m-3 text-center text-lg font-bold md:text-xl lg:text-2xl">
            Watchlist
          </h1>
          <div className="w-full border-t-[1px] border-slate-500"></div>
          <div className="flex flex-col items-center">
            {watchlist.map((movie, index) => (
              <div className="flex w-full flex-row items-center gap-3 border-b-[1px] border-slate-500 p-2">
                <div className="flex w-full flex-col gap-1">
                  <p className="text-sm font-semibold md:text-base">
                    {movie.title} {movie.release_date.split('-')[0]}
                  </p>
                  <p className="text-xs md:text-sm">{movie.overview}</p>
                </div>
                <Link
                  href={`/${movie.id}`}
                  className="rounded-md p-1 duration-150 hover:cursor-pointer hover:bg-slate-200 hover:bg-opacity-15"
                >
                  <SquareArrowOutUpRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistModule;
