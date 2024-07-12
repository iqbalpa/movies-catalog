'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const antiHeader: string[] = ['/signup', '/signin'];

const Header: React.FC = () => {
  const pathname = usePathname();
  const isSidebarDisabled = antiHeader.includes(pathname);
  if (isSidebarDisabled) {
    return null;
  }

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

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? 'bg-opacity-100' : 'bg-opacity-10'
      } bg-slate-800`}
    >
      <div className="container mx-auto flex h-10 items-center justify-between md:h-16">
        <Link
          href="/"
          className="text-lg font-bold text-white md:text-xl lg:text-2xl"
        >
          Movies Catalog
        </Link>
      </div>
    </header>
  );
};

export default Header;
