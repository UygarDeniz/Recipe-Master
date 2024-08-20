import { Ingredient } from '@prisma/client';

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <div>
      <h2 className='font-semibold text-2xl mb-4 text-gray-600 dark:text-gray-300'>
        INGREDIENTS
      </h2>
      <ul className='space-y-2 list-disc text-2xl ml-4'>
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className='text-gray-500 dark:text-gray-400 font-medium text-lg'
          >
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeIngredients;
