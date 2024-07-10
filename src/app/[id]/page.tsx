'use client';

import DetailMovieModule from '@/modules/detailMovie/detailMovie';
import { usePathname } from 'next/navigation';

export default function Page() {
  const id = usePathname().replace('/', '');

  return <DetailMovieModule id={id} />;
}
