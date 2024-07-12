'use client';

import { logout } from '@/store/userSlice';
import { RootState } from '@/store/userStore';
import { getCookie } from 'cookies-next';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const antiHeader: string[] = ['/signup', '/signin'];

const Header: React.FC = () => {
  const pathname = usePathname();
  const isSidebarDisabled = antiHeader.includes(pathname);
  if (isSidebarDisabled) {
    return null;
  }

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    setTimeout(() => {
      router.push('/signin');
    }, 500);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? 'bg-opacity-100' : 'bg-opacity-10'
      } bg-slate-800`}
    >
      <div className="container mx-auto flex h-10 items-center justify-between px-2 py-2 text-white md:h-16 md:px-6">
        <Link href="/" className="text-lg font-bold md:text-xl lg:text-2xl">
          Movies Catalog
        </Link>
        <div className="flex flex-row items-center gap-5">
          <Link
            href="/watchlist"
            className="rounded-lg bg-slate-200 bg-opacity-5 px-3 py-2 font-semibold duration-150 hover:scale-105 hover:bg-opacity-15 hover:text-slate-200 md:px-4"
          >
            Watchlist
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex cursor-pointer flex-row justify-center rounded-lg border-2 border-red-300 bg-red-300 bg-opacity-90 px-3 py-2 font-bold text-red-500 duration-150 hover:scale-105 hover:bg-red-200 hover:text-red-700 md:px-4"
            >
              <p className="mr-2">Logout</p>
              <LogOut />
            </button>
          ) : (
            <Link
              href="/signin"
              className="flex cursor-pointer flex-row justify-center rounded-lg border-2 border-green-300 bg-green-300 bg-opacity-90 px-3 py-2 font-bold text-green-500 duration-150 hover:scale-105 hover:bg-green-200 hover:text-green-700 md:px-4"
            >
              <p className="mr-2">Login</p>
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
