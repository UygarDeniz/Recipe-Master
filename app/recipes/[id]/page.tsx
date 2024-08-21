import Link from 'next/link';
import { notFound } from 'next/navigation';
import RecipeCategory from '@/components/RecipeCategory';
import RecipeImage from '@/components/RecipeImage';
import RecipeIngredients from '@/components/RecipeIngredients';
import RecipeInstructions from '@/components/RecipeInstructions';
import Button from '@/components/Button';
import { getCurrentUser } from '@/lib/session';
import { getRecipeById } from '@/data-access/recipes';
import { z } from 'zod';
import LikeButton from '@/components/LikeButton';

const idSchema = z.string().cuid();

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const validatedId = idSchema.parse(params.id);

  const user = await getCurrentUser();
  const recipe = await getRecipeById(validatedId);

  if (!recipe) {
    return notFound();
  }
  const canEdit = recipe.userId === user?.id;
  const hasLiked = recipe.likes.some((like) => like.userId === user?.id);

  return (
    <div className='bg-primary dark:bg-gray-900 min-h-screen flex items-center justify-center py-5'>
      <article className='bg-white dark:bg-gray-800 rounded-lg shadow-lg break-all mx-10 lg:max-w-[70%] xl:max-w-[50%] w-full p-8'>
        <RecipeImage title={recipe.title} src={recipe?.image || "/default.jpg"} />

        <div className='flex justify-between items-center mb-2 mt-6'>
          <RecipeCategory category={recipe.category} />
          <div className='text-gray-600 dark:text-gray-300 font-medium'>
            by {recipe.user?.name}
          </div>

          {user && (
            <LikeButton
              likes={recipe.likes.length}
              hasLiked={hasLiked}
              userId={user.id!}
              recipeId={recipe.id}
            />
          )}
          {canEdit && (
            <Button variant='danger' asChild>
              <Link href={`/recipes/${recipe.id}/edit`}>Edit</Link>
            </Button>
          )}
        </div>

        <hr className='border border-gray-400 dark:border-gray-700 mb-6' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeInstructions instructions={recipe.instructions} />
        </div>
      </article>
    </div>
  );
}
