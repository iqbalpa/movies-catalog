import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export const getWatchlist = async (accessToken: string): Promise<Movie[]> => {
  const res = await axios.get(`${BASE_URL}/movies/watchlist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const movies: Movie[] = res.data;
  return movies;
};

export const addToWatchlist = async (
  accessToken: string,
  dto: Movie,
): Promise<Movie> => {
  const res = await axios.post(`${BASE_URL}/movies`, dto, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const movie: Movie = res.data;
  return movie;
};

export const deleteFromWatchlist = async (
  accessToken: string,
  movieId: number,
): Promise<Movie> => {
  const res = await axios.delete(`${BASE_URL}/movies/watchlist/${movieId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const movie: Movie = res.data;
  console.log('DELETED');
  console.log(movie);
  return movie;
};
