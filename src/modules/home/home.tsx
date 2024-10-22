'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { getAllMovies, getMoviesWithQuery } from '@/api/movies.api';
import { Movie } from '@/constant/movie';
import Backdrop from '@/components/backdrop/backdrop';
import ListMovies from '@/components/listMovies/listMovies';
import MyPagination from '@/components/myPagination/myPagination';
import SearchBar from '@/components/searchBar/searchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCookie } from 'cookies-next';
import { getWatchlist } from '@/api/watchlist.api';
import { addWatchlist } from '@/store/watchlistSlice';

const HomeModule: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [backdrop, setBackdrop] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const user = useSelector((state: RootState) => state.user.user);
  const accessToken = getCookie('accessToken') as string;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchWatchlist = async () => {
      try {
        const res = await getWatchlist(accessToken);
        for (const movie of res) {
          dispatch(addWatchlist(movie.id));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchWatchlist();
  }, [user, accessToken, dispatch]);

  useEffect(() => {
    if (query !== '') {
      return;
    }
    const fetchMovies = async () => {
      try {
        const res: Movie[] = await getAllMovies(currentPage);
        setMovies(res);
        setBackdrop(
          `https://image.tmdb.org/t/p/original${res[2].backdrop_path}`,
        );
      } catch (e) {
        console.log('failed to fetch the movies');
      }
    };
    fetchMovies();
  }, [currentPage, query, backdrop]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchMovies = async () => {
      try {
        const res: Movie[] = await getMoviesWithQuery(query, currentPage);
        setMovies(res);
      } catch (e) {
        console.log('failed to fetch the movies');
      }
    };
    fetchMovies();
  }, [query, currentPage]);

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === 1) {
        return 1;
      }
      return prevPage - 1;
    });
  };
  const handleClickNext = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === 500) {
        return 500;
      }
      return prevPage + 1;
    });
  };
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black pb-20">
      <Backdrop movie={movies[2]} backdrop={backdrop} />
      <SearchBar query={query} handleQueryChange={handleQueryChange} />
      <ListMovies movies={movies} />
      <MyPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleClickNext={handleClickNext}
        handleClickPrev={handleClickPrev}
      />
    </div>
  );
};

export default HomeModule;
