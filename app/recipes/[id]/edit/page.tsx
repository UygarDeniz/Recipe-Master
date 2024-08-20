import React from 'react';
import { z } from 'zod';
import { getRecipeById } from '@/data-access/recipes';
import { assertAuthenticated } from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import EditRecipeForm from '@/components/EditRecipeForm';

const idSchema = z.string().cuid();
async function page({ params }: { params: { id: string } }) {
  const validatedId = idSchema.parse(params.id);

  const user = await assertAuthenticated();
  const recipe = await getRecipeById(validatedId);
  if (!recipe) {
    return notFound();
  }

  if (recipe.userId !== user.id) {
    return redirect('/');
  }

  return (
    <div className='bg-primary dark:bg-gray-900 min-h-screen flex items-center justify-center py-5'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-8'>
        <h2 className='text-2xl font-bold mb-6 dark:text-white'>Edit Recipe</h2>
        <EditRecipeForm recipe={recipe} />
      </div>
    </div>
  );
}

export default page;
