'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex justify-center items-center mt-8'>
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className='px-2 py-1 border-2 border-red-500 rounded-md mr-4 text-2xl'
        >
          Previous
        </Link>
      )}
      <span className='text-2xl mx-4'>
        Page {totalPages ? currentPage : 0} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className='px-4 py-1 border-2 border-red-500 rounded-md text-2xl'
        >
          Next
        </Link>
      )}
    </div>
  );
}
