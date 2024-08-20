import EmailUpdateForm from '@/components/EmailUpdateForm';
import Logout from '@/components/Logout';
import NameUpdateForm from '@/components/NameUpdateForm';
import PasswordUpdateForm from '@/components/PasswordUpdateForm';
import { assertAuthenticated } from '@/lib/session';
import React from 'react';

async function page() {
  const user = await assertAuthenticated();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-primary py-10 dark:bg-gray-900'>
      <div className='bg-white py-10 flex flex-col rounded-lg shadow-lg w-full max-w-xl dark:bg-gray-800'>
        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200'>
          Profile
        </h1>

        <NameUpdateForm name={user.name!} />
        <hr className='border-gray-600 border' />
        <EmailUpdateForm email={user.email!} />
        <hr className='border-gray-600 border' />
        <PasswordUpdateForm />
        <hr className='border-gray-600 border' />
        <div className='mt-20 px-16 text-center'>
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default page;
