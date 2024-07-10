import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="fixed z-30 h-16 w-full bg-slate-800 p-4">
      <h1 className="text-2xl font-bold text-white">Movies Catalog</h1>
    </div>
  );
};

export default Header;
