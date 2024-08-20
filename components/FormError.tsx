import { CircleAlert } from 'lucide-react';
import React from 'react';

function FormError({ message }: { message: string }) {
  return (
    <div className='my-2 py-4  bg-red-500  rounded-md px-4'>
      <p className='w-full rounded text-sm text-white'>{message}</p>
    </div>
  );
}

export default FormError;
