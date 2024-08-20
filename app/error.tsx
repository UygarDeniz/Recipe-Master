'use client';

import { AUTHENTICATION_ERROR_MESSAGE } from '@/lib/constants';
import React from 'react';

function Error({ error }: { error: Error & { digest?: string } }) {
  const isAuthError = error.message.includes(AUTHENTICATION_ERROR_MESSAGE);
  return (
    <div className=' min-h-screen flex items-center justify-center'>
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <h1 className='text-5xl mb-4 font-bold text-gray-800 dark:text-gray-200'>
            {isAuthError
              ? 'You Need To Be Logged In!'
              : 'Something Went Wrong!'}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Error;
