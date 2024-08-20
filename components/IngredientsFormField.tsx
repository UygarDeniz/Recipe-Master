'use client';
import { CircleMinus } from 'lucide-react';
import { useState } from 'react';
import { Ingredient } from '@/lib/types';

function IngredientsFormField({
  ingredients,
  setIngredients,
}: {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}) {
  const [error, setError] = useState<string | null>(null);

  function handleIngredientChange(
    index: number,
    key: keyof Ingredient,
    value: string
  ) {
    const newIngredients = [...ingredients];
    newIngredients[index][key] = value;
    setIngredients(newIngredients);
  }

  const addIngredient = () => {
    setError(null);
    if (ingredients.length > 0) {
      const hasEmptyIngredient = ingredients.some(
        (ingredient) => ingredient.name === '' || ingredient.quantity === ''
      );
      if (hasEmptyIngredient) {
        setError('Please fill in the ingredient name and quantity');
        return;
      }
    }
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length === 1) {
      setError('You must have at least one ingredient');
      return;
    }
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <h2 className='block text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'>
        Ingredients
      </h2>
      <div className='flex flex-col space-y-4'>
        {ingredients.map((ingredient, index) => (
          <div key={index} className='flex items-center '>
            <label className='sr-only' htmlFor={`ingredient-${index}-name`}>
              Ingredient Name
            </label>
            <input
              id={`ingredient-${index}-name`}
              name='ingredient'
              type='text'
              placeholder='Ingredient Name'
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, 'name', e.target.value)
              }
              className='w-full border rounded-md p-2 mr-4 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:border-gray-600'
            />
            <label className='sr-only' htmlFor={`ingredient-${index}-quantity`}>
              Quantity
            </label>
            <input
              id={`ingredient-${index}-quantity`}
              type='text'
              placeholder='Quantity'
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, 'quantity', e.target.value)
              }
              className='border rounded-md p-2 mr-4 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:border-gray-600'
            />
            <button type='button' onClick={() => removeIngredient(index)}>
              <CircleMinus color='#ed0c0c' />
            </button>
          </div>
        ))}
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <div className='flex justify-center'>
          <button
            type='button'
            onClick={addIngredient}
            className='flex items-center  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md '
          >
            + Ingredient
          </button>
        </div>
      </div>
    </div>
  );
}

export default IngredientsFormField;
