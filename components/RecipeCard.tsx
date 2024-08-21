import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@prisma/client';
import RecipeCategory from './RecipeCategory';

type RecipeCardProps = {
  recipe: Recipe & {
    user: {
      name: string | null;
    };
  };
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg hover:scale-105 transition-all shadow-md overflow-hidden hover:shadow-lg duration-500'>
      <Link href={`/recipes/${recipe.id}`}>
        <div className='relative'>
          <Image
            src={recipe.image || '/default.jpg'}
            alt={recipe.title}
            width={400}
            height={300}
            className='w-full h-48 object-cover'
          />
        </div>
        <div className='p-4'>
          <div className='mb-2 flex justify-between items-center'>
            <RecipeCategory category={recipe.category} />

            <p className='text-gray-600 dark:text-gray-200'>
              {recipe.user?.name}
            </p>
          </div>

          <h3 className='text-lg font-semibold dark:text-white'>
            {recipe.title}
          </h3>
          <p className='text-gray-600 dark:text-gray-400'>
            {recipe.description && recipe.description.length > 30
              ? recipe.description.slice(0, 30)
              : recipe.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
