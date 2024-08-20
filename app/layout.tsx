import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/providers/Providers';
import Header from '@/components/Header';
import { Toaster } from 'sonner'
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recipe Master',
  description:
    'A recipe app that helps you find and save your favorite recipes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster richColors position='top-right' toastOptions={{classNames:{ toast: "text-lg"}}}/>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
