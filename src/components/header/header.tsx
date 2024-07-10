import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 z-30 h-16 w-full bg-slate-800 p-4">
      <Link href="/" className="text-2xl font-bold text-white">
        Movies Catalog
      </Link>
    </div>
  );
};

export default Header;
