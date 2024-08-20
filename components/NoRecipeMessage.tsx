import React from 'react';

export default function NoRecipesMessage() {
  return (
    <div className='text-center text-gray-600 dark:text-gray-400'>
      <h2 className='text-2xl font-semibold'>You have no recipes yet</h2>
      <p className='mt-2'>Start creating and sharing your delicious recipes!</p>
    </div>
  );
}
