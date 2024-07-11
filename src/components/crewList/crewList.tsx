import React from 'react';
import { Crew } from '@/constant/detailMovie';

interface ICrewList {
  job: string;
  crew: Crew[];
}

const CrewList: React.FC<ICrewList> = ({ job, crew }) => (
  <div
    className={`mx-28 flex flex-row gap-2 ${job === 'Director' ? 'border-t border-slate-800' : 'border-y border-slate-800'} px-2 py-5 text-white`}
  >
    <p className="font-bold">{job}</p>
    {crew
      .filter((member) => member.job === job)
      .map((member, index, array) => (
        <React.Fragment key={index}>
          <p>{member.name}</p>
          {index !== array.length - 1 && (
            <p className="text-xl text-gray-400">·</p>
          )}
        </React.Fragment>
      ))}
  </div>
);

export default CrewList;
