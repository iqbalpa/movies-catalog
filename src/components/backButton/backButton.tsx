'use client';

import { CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton: React.FC = () => {
  const router = useRouter();
  const handleBack = () => router.push('/');

  return (
    <button
      onClick={handleBack}
      className="absolute left-5 top-20 z-50 flex flex-row gap-2 rounded-full bg-slate-600 bg-opacity-80 px-5 py-3 text-white duration-100 hover:scale-105 hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-95"
    >
      <CircleArrowLeft />
      <p>Back</p>
    </button>
  );
};

export default BackButton;
