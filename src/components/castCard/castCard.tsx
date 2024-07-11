import React from 'react';
import Image from 'next/image';

interface ICastCard {
  name: string;
  character: string;
  profile_path: string;
}

const CastCard: React.FC<ICastCard> = ({ name, character, profile_path }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        src={`https://image.tmdb.org/t/p/w500${profile_path}`}
        alt={name}
        width={100}
        height={100}
        className="rounded-xl"
      />
      <div className="flex flex-col">
        <p className="text-sm font-semibold md:text-base">{name}</p>
        <p className="text-sm text-slate-300 md:text-base">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
