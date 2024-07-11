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
    <div
      className={`fixed top-0 z-50 h-16 w-full p-4 transition-all duration-500 ${
        isScrolled ? 'bg-opacity-100' : 'bg-opacity-10'
      } bg-slate-800`}
    >
      <Link href="/" className="text-2xl font-bold text-white">
        Movies Catalog
      </Link>
    </div>
  );
};

export default Header;
