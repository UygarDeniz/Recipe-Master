'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function likeRecipe(recipeId: string, userId: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        likes: true,
      },
    });

    if (!recipe) {
      return null;
    }

    const hasLiked = recipe.likes.some((like) => like.userId === userId);

    if (hasLiked) {
      await prisma.like.deleteMany({
        where: {
          recipeId,
          userId,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          recipeId,
          userId,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
  revalidatePath(`/recipes/${recipeId}`);
}
