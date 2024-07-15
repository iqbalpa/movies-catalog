import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface IDropdown {
  isScrolled: boolean;
  handleLogout: () => void;
}

const Dropdown: React.FC<IDropdown> = ({ isScrolled, handleLogout }) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div
      className={`flex w-full flex-col transition-all duration-500 ${
        isScrolled ? 'bg-opacity-100' : 'bg-opacity-10'
      } bg-slate-800 text-center text-white`}
    >
      {user ? (
        <>
          <Link
            href="/watchlist"
            className="py-2 duration-150 hover:scale-105 hover:bg-slate-900 hover:bg-opacity-50 hover:font-semibold"
          >
            Watchlist
          </Link>
          <button
            onClick={handleLogout}
            className="py-2 duration-150 hover:scale-105 hover:bg-slate-900 hover:bg-opacity-50 hover:font-semibold"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/signin"
            className="py-2 duration-150 hover:scale-105 hover:bg-slate-900 hover:bg-opacity-50 hover:font-semibold"
          >
            Watchlist
          </Link>
          <Link
            href="/signin"
            className="py-2 duration-150 hover:scale-105 hover:bg-slate-900 hover:bg-opacity-50 hover:font-semibold"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Dropdown;
