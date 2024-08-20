import { getAllFilteredRecipes } from '@/data-access/recipes';
import React from 'react';
import RecipeCard from './RecipeCard';
type RecipeListProps = {
  currentPage: number;
  category: string;
  query: string;
  userId?: string;
};
async function RecipeList({ currentPage, category, query, userId }: RecipeListProps) {
  const recipes = await getAllFilteredRecipes(query, currentPage, category, userId);
  return (
    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 w-full '>
      {recipes.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <div className='col-span-full flex justify-center items-center mt-40'>
          <p className='text-center text-gray-600 text-4xl dark:text-gray-400'>
            No recipes found
          </p>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
