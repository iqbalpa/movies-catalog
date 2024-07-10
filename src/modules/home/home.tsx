'use client';

import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { Movie } from '@/constant/movie';
import Header from '@/components/header/header';
import Backdrop from '@/components/backdrop/backdrop';
import ListMovies from '@/components/listMovies/listMovies';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const HomeModule: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [backdrop, setBackdrop] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
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

  const maxPage = Math.floor(948785 / 20);
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
      if (prevPage === maxPage) {
        return maxPage;
      }
      return prevPage + 1;
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col pb-20">
      <Header />
      <Backdrop movie={movies[2]} backdrop={backdrop} />
      <ListMovies movies={movies} />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handleClickPrev}
              className="hover:cursor-pointer"
            />
          </PaginationItem>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          {currentPage < maxPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={handleClickNext}
              className="hover:cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HomeModule;
