import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
      <h2 className='text-2xl text-gray-600 mb-8'>Page Not Found</h2>
      <p className='text-gray-500 mb-8'>
        Sorry, the page you are looking for does not exist.
      </p>
      <Button variant='secondary' asChild>
        <Link href='/'>Go back to home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
