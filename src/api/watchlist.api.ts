import axios from 'axios';

const BASE_URL: string = 'http://localhost:3000';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  userId: number;
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
