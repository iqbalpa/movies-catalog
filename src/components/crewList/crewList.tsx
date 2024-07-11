import React from 'react';
import { Crew } from '@/constant/detailMovie';

interface ICrewList {
  job: string;
  crew: Crew[];
}

const CrewList: React.FC<ICrewList> = ({ job, crew }) => (
  <div
    className={`mx-10 flex flex-row gap-2 lg:mx-28 ${job === 'Director' ? 'border-t border-slate-800' : 'border-y border-slate-800'} px-2 py-3 text-white md:py-5`}
  >
    <p className="text-sm font-bold md:text-base">{job}</p>
    {crew
      .filter((member) => member.job === job)
      .map((member, index, array) => (
        <React.Fragment key={index}>
          <p className="text-sm md:text-base">{member.name}</p>
          {index !== array.length - 1 && (
            <p className="text-xl text-gray-400">·</p>
          )}
        </React.Fragment>
      ))}
  </div>
);

export default CrewList;
