'use client';

import FormButton from './FormButton';
import { createRecipe, State } from '@/actions/recipe/create-recipe';
import { useState } from 'react';
import IngredientsFormField from './IngredientsFormField';
import InstructionForm from './InstructionsFormField';
import { Ingredient, Instruction } from '@/lib/types';
import { RecipeCategory } from '@prisma/client';
import { toast } from 'sonner';
import FormError from './FormError';
import { useRouter } from 'next/navigation';
function CreateRecipeForm() {
  const [errors, setErrors] = useState<State>({ message: null, errors: {} });
  const [instructions, setInstructions] = useState<Instruction[]>([
    { step: 1, text: '' },
  ]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantity: '' },
  ]);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    formData.append('instructions', JSON.stringify(instructions));
    formData.append('ingredients', JSON.stringify(ingredients));

    try {
      const response = await createRecipe(formData);
      setErrors({ message: response.message, errors: response.errors });
      if (response.message === 'Recipe created successfully!') {
        toast.success(response.message);
        router.push(`/recipes/${response.newRecipeId}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to create recipe');
    }
  };

  return (
    <form
      action={handleSubmit}
      className='w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 py-8'
    >
      <h2 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
        Create a New Recipe
      </h2>
      <div className='mb-4'>
        <label
          htmlFor='title'
          className='block text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          className='mt-1 block w-full p-2 border border-gray-300 focus:outline-orange-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
          maxLength={50}
        />
      </div>
      {errors?.errors?.title && <FormError message={errors.errors.title[0]} />}

      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-orange-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
          rows={4}
          maxLength={200}
        />
      </div>
      {errors?.errors?.description && (
        <FormError message={errors.errors.description[0]} />
      )}

      <IngredientsFormField
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      {errors?.errors?.ingredients && (
        <FormError message={errors.errors.ingredients[0]} />
      )}
      <hr className='my-6 border-gray-300 dark:border-gray-600' />

      <InstructionForm
        instructions={instructions}
        setInstructions={setInstructions}
      />
      {errors?.errors?.instructions && (
        <FormError message={errors.errors.instructions[0]} />
      )}
      <hr className='my-6 border-gray-300 dark:border-gray-600' />
      <div className='mt-10'>
        <div className='flex space-x-4 items-center mb-4'>
          <label
            htmlFor='image-url'
            className='block text-xl font-semibold  text-gray-700 dark:text-gray-300'
          >
            Image URL
          </label>
          <p className='text-gray-500 dark:text-gray-400'>
            (Image URL must be from images.pexels.com)
          </p>
        </div>
        <input
          type='text'
          id='image-url'
          name='image-url'
          className='mt-1 block w-full p-2 border border-gray-300 focus:outline-orange-500 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
        />
        {errors?.errors?.imageURL && (
          <FormError message={errors.errors.imageURL[0]} />
        )}
      </div>
      <div className='mt-10 '>
        <label
          htmlFor='category'
          className='block text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'
        >
          Category
        </label>
        <select
          id='category'
          name='category'
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400'
        >
          {Object.values(RecipeCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className='text-center mt-20  '>
        <FormButton variant='primary' formName='Create Recipe' />
      </div>
    </form>
  );
}

export default CreateRecipeForm;
