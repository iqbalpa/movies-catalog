'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '@/api/api';
import { Movie } from '@/constant/movie';
import Header from '@/components/header/header';
import Backdrop from '@/components/backdrop/backdrop';
import ListMovies from '@/components/listMovies/listMovies';
import MyPagination from '@/components/myPagination/myPagination';
import SearchBar from '@/components/searchBar/searchBar';

const HomeModule: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [backdrop, setBackdrop] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (query !== '') {
      return;
    }
    const fetchMovies = async () => {
      try {
        const res: Movie[] = await api.getAllMovies(currentPage);
        console.log(res);
        setMovies(res);
        setBackdrop(
          `https://image.tmdb.org/t/p/original${res[2].backdrop_path}`,
        );
        console.log(backdrop);
      } catch (e) {
        console.log('failed to fetch the movies');
      }
    };
    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchMovies = async () => {
      try {
        const res: Movie[] = await api.getMoviesWithQuery(query, currentPage);
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
    <div className="flex min-h-screen w-full flex-col pb-20">
      <Header />
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
