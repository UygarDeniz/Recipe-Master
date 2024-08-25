'use client';
import { useState } from 'react';
import { Recipe, RecipeCategory } from '@prisma/client';
import { Ingredient, Instruction } from '@/lib/types';
import FormButton from './FormButton';
import InstructionForm from './InstructionsFormField';
import IngredientsFormField from './IngredientsFormField';
import { editRecipe, State } from '@/actions/recipe/edit-recipe';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import FormError from './FormError';
type RecipeFormProps = {
  recipe: Recipe & {
    ingredients: Ingredient[];
    instructions: Instruction[];
  };
};

function EditRecipeForm({ recipe }: RecipeFormProps) {
  const [instructions, setInstructions] = useState([...recipe.instructions]);
  const [ingredients, setIngredients] = useState([...recipe.ingredients]);
  const router = useRouter();
  const [errors, setErrors] = useState<State>({ message: null, errors: {} });

  const editRecipeWithRecipeId = editRecipe.bind(null, recipe.id);

  const handleSubmit = async (formData: FormData) => {
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));

    try {
      const response = await editRecipeWithRecipeId(formData);
      setErrors({ message: response.message, errors: response.errors });
      if (response.message === 'Recipe updated successfully!') {
        toast.success(response.message);
        router.push(`/recipes/${recipe.id}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to update recipe');
    }
  };

  return (
    <form
      action={handleSubmit}
      className='w-full  p-8 py-8'
    >
      <h2 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200'>
        Edit  Recipe
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
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white '
          maxLength={50}
          defaultValue={recipe.title}
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
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400'
          rows={4}
          maxLength={200}
          defaultValue={recipe.description || ''}
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
        <FormButton variant='primary' formName='Edit Recipe' />
      </div>
    </form>
  );
}

export default EditRecipeForm;
