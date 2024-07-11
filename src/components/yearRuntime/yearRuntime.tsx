import { convertRuntime } from '@/utils/convertRuntime';
import { Dot } from 'lucide-react';
import React from 'react';

interface IYearRuntime {
  release_date: string;
  runtime: number;
}

const YearRuntime: React.FC<IYearRuntime> = ({ release_date, runtime }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <p className="text-xl font-bold">{release_date.split('-')[0]}</p>
      <Dot />
      <p>{convertRuntime(runtime)}</p>
    </div>
  );
};

export default YearRuntime;
