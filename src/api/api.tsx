import axios from 'axios';
import { Movie } from '@/constant/movie';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzM0Njg0NjI2OTg1ODI3OTE1NzMyNWY5OTAxZmU4ZCIsIm5iZiI6MTcyMDU4OTg3MC4wMzYzNDIsInN1YiI6IjY2OGUxY2JlMzA0OTRhNmE2OTMyYzE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jkIXGMw1WWmtEO9XDryk4R5gP35WQIZHQ8uGIH-QgnM';

const getAllMovies = async (currentPage: number): Promise<Movie[]> => {
  const res = await axios.get(
    `${BASE_URL}discover/movie?include_adult=true&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
  const movies: Movie[] = res.data.results;
  return movies;
};

const getMoviesWithQuery = async (
  query: string,
  currentPage: number,
): Promise<Movie[]> => {
  const parsedQuery = parseQuery(query);
  const res = await axios.get(
    `${BASE_URL}search/movie?query=${parsedQuery}&page=${currentPage}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
  const movies: Movie[] = res.data.results;
  return movies;
};

const getMovieById = async (id: number): Promise<Movie> => {
  const res = await axios.get(`${BASE_URL}movie/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  const movie: Movie = res.data;
  console.log(movie);
  return movie;
};

const parseQuery = (query: string): string => {
  return query.replace(' ', '+');
};

export default {
  BASE_URL,
  getAllMovies,
  getMoviesWithQuery,
  getMovieById,
};
