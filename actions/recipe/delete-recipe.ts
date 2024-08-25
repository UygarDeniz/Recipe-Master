'use server';
import prisma from '@/lib/db';
import { assertAuthenticated } from '@/lib/session';

export async function deleteRecipe(recipeId: string) {
  const user = await assertAuthenticated();
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { userId: true },
    });

    if (!recipe || recipe.userId !== user.id) {
      return { success: false, message: 'Recipe not found' };
    }

    await prisma.recipe.delete({ where: { id: recipeId } });
    return { success: true, message: 'Recipe deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete recipe' };
  }
}
