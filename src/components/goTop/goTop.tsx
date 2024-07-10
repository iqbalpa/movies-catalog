'use client';

import React, { useEffect, useState } from 'react';
import { CircleChevronUp } from 'lucide-react';

const GoTop: React.FC = () => {
  const [showGoTop, setShowGoTop] = useState<boolean>(false);

  const handleVisibleButton = () => {
    const position = window.scrollY;
    if (position > 50) {
      setShowGoTop(true);
    } else {
      setShowGoTop(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);
    return () => {
      window.removeEventListener('scroll', handleVisibleButton);
    };
  }, []);

  return (
    showGoTop && (
      <button
        onClick={handleClick}
        className="fixed bottom-10 right-10 rounded-full bg-slate-600 bg-opacity-80 p-2 text-white duration-100 hover:scale-105 hover:cursor-pointer hover:bg-slate-800 hover:bg-opacity-95"
      >
        <CircleChevronUp size={32} />
      </button>
    )
  );
};

export default GoTop;
