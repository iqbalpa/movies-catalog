import axios from 'axios';
import { Movie } from '@/constant/movie';
import { DetailMovie } from '@/constant/detailMovie';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.API_KEY

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

const getMovieById = async (id: number): Promise<DetailMovie> => {
  const res = await axios.get(
    `${BASE_URL}movie/${id}?append_to_response=credits`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
  const movie: DetailMovie = res.data;
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
