import React from 'react';
import { z } from 'zod';
import { getRecipeById } from '@/data-access/recipes';
import { assertAuthenticated } from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import EditRecipeForm from '@/components/EditRecipeForm';
import DeleteRecipe from '@/components/DeleteRecipe';

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
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl pt-8 pb-12'>
        <EditRecipeForm recipe={recipe} />
        <hr className='border border-gray-400 dark:border-gray-700 my-6' />
        <DeleteRecipe id={recipe.id} />
      </div>
    </div>
  );
}

export default page;
