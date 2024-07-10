import api from '@/api/api';
import { Movie } from '@/constant/movie';
import React, { useEffect, useState } from 'react';

interface IDetailMovieModule {
  id: string;
}

const DetailMovieModule: React.FC<IDetailMovieModule> = ({ id }) => {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.getMovieById(parseInt(id));
        setMovie(res);
      } catch (e) {
        console.log('failed to fetch movie');
      }
    };
    fetchMovie();
  }, [id]);

  return (
    <div className="pt-20">
      <h1>hello from detail movie page {id}</h1>
    </div>
  );
};

export default DetailMovieModule;
