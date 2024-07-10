import React from 'react';

const HomeModule: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-sky-300">
      {/* Header */}
      <div className="fixed w-full bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-white">Movies Catalog</h1>
      </div>
    </div>
  );
};

export default HomeModule;
