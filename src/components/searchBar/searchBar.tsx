import React, { ChangeEvent } from 'react';
import { Search } from 'lucide-react';

interface ISearchBar {
  query: string;
  handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ query, handleQueryChange }) => {
  return (
    <div className="relative flex w-full justify-center bg-slate-800 p-4">
      <div className="relative w-full max-w-md">
        <Search
          size={24}
          className="absolute left-4 top-1/2 -translate-y-1/2 transform text-slate-500"
        />
        <input
          placeholder="Search"
          className="w-full rounded-full border-2 border-slate-300 py-2 pl-12 pr-4 focus:border-slate-500"
          value={query}
          onChange={handleQueryChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
