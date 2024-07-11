'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
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
      className={`fixed top-0 z-50 w-full p-4 transition-all duration-500 ${
        isScrolled ? 'bg-opacity-100' : 'bg-opacity-10'
      } bg-slate-800`}
    >
      <div className="container mx-auto flex h-10 md:h-16 items-center justify-between">
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
