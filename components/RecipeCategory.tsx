import { cn } from '@/lib/utils';
import React from 'react';
const CategoryColors = {
  BREAKFAST: 'bg-yellow-400',
  LUNCH: 'bg-green-400',
  DINNER: 'bg-red-400',
  DESSERT: 'bg-pink-400',
  SNACK: 'bg-blue-400',
  DRINK: 'bg-purple-400',
  OTHER: 'bg-gray-400',
};

type RecipeCategory = keyof typeof CategoryColors;

function RecipeCategory({ category }: { category: RecipeCategory }) {
  return (
    <div data-testid="recipe-category" className={cn('px-4 py-1 rounded-xl text-white inline-block ', CategoryColors[category])}>
      {category.toLowerCase().charAt(0).toLocaleUpperCase() + category.toLowerCase().slice(1)}
    </div>
  );
}

export default RecipeCategory;
