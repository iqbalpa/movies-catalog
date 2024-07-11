import React from 'react';
import Image from 'next/image';
import { Cast } from '@/constant/detailMovie';
import CastCard from '@/components/castCard/castCard';

interface ITopCast {
  cast: Cast[];
}

const TopCast: React.FC<ITopCast> = ({ cast }) => {
  return (
    <div className="mx-10 flex flex-col items-center justify-center px-10 py-5 text-white md:mx-28">
      <h1 className="text-lg font-bold md:text-xl lg:text-3xl">Top Casts</h1>
      <div className="mt-4 grid gap-4 md:mt-8 md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4 xl:grid-cols-4 xl:grid-rows-3">
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
