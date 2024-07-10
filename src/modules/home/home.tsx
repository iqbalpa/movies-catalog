'use client';

import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { Movie } from '@/constant/movie';
import Header from '@/components/header/header';
import Backdrop from '@/components/backdrop/backdrop';
import ListMovies from '@/components/listMovies/listMovies';

const HomeModule: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
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
        console.log(backdrop);
      } catch (e) {
        console.log('failed to fetch the movies');
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col pb-20">
      <Header />
      <Backdrop movie={movies[2]} backdrop={backdrop} />
      <ListMovies movies={movies} />
    </div>
  );
};

export default HomeModule;
