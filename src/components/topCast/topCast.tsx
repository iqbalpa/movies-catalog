import React from 'react';
import Image from 'next/image';
import { Cast } from '@/constant/detailMovie';
import CastCard from '../castCard/castCard';

interface ITopCast {
  cast: Cast[];
}

const TopCast: React.FC<ITopCast> = ({ cast }) => {
  return (
    <div className="mx-28 flex flex-col items-center justify-center px-10 py-5 text-white">
      <h1 className="text-3xl font-bold">Top Casts</h1>
      <div className="mt-8 grid grid-cols-4 grid-rows-3 gap-4">
        {cast.slice(0, 12).map((cast, index) => (
          <CastCard
            key={cast.id}
            name={cast.name}
            character={cast.character}
            profile_path={cast.profile_path}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCast;
