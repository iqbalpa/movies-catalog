'use client';

import { logout } from '@/store/userSlice';
import { RootState } from '@/store/store';
import { getCookie } from 'cookies-next';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hamburger from 'hamburger-react';
import Dropdown from '../dropdown/dropdown';

const antiHeader: string[] = ['/signup', '/signin'];

const Header: React.FC = () => {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSidebarDisabled = antiHeader.includes(pathname);
  if (isSidebarDisabled) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? 'bg-opacity-100' : 'bg-opacity-100 md:bg-opacity-10'
      } bg-slate-800`}
    >
      <div className="container mx-auto flex h-10 items-center justify-between px-4 py-8 text-white md:h-16 md:px-6">
        <Link
          href="/"
          className="text-base font-bold md:text-lg lg:text-xl xl:text-2xl"
        >
          Movies Catalog
        </Link>
        <div className="block md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
        <div className="hidden flex-row items-center gap-5 md:flex">
          {user ? (
            <>
              <Link
                href="/watchlist"
                className="rounded-lg border-2 bg-slate-200 bg-opacity-5 px-3 py-2 font-semibold duration-150 hover:scale-105 hover:bg-opacity-15 hover:text-slate-200 md:px-4"
              >
                Watchlist
              </Link>
              <button
                onClick={handleLogout}
                className="flex cursor-pointer flex-row justify-center rounded-lg border-2 border-red-200 bg-red-200 bg-opacity-90 px-3 py-2 font-bold text-red-700 duration-150 hover:scale-105 hover:border-red-400 hover:bg-red-400 hover:text-red-900 md:px-4"
              >
                <p className="mr-2">Logout</p>
                <LogOut />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border-2 bg-slate-200 bg-opacity-5 px-3 py-2 font-semibold duration-150 hover:scale-105 hover:bg-opacity-15 hover:text-slate-200 md:px-4"
              >
                Watchlist
              </Link>
              <Link
                href="/signin"
                className="flex cursor-pointer flex-row justify-center rounded-lg border-2 border-green-200 bg-green-200 bg-opacity-90 px-3 py-2 font-bold text-green-700 duration-150 hover:scale-105 hover:border-green-400 hover:bg-green-400 hover:text-green-900 md:px-4"
              >
                <p className="mr-2">Sign In</p>
                <LogIn />
              </Link>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <Dropdown isScrolled={isScrolled} handleLogout={handleLogout} />
      )}
    </header>
  );
};

export default Header;
