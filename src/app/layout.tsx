import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import GoTop from '@/components/goTop/goTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies Catalog',
  description: 'Movies Catalog with TMDB API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`inter.className relative`}>
        <Header />
        {children}
        <GoTop />
      </body>
    </html>
  );
}
