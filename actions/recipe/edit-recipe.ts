'use server';
import { assertAuthenticated } from '@/lib/session';
import { RecipeSchema } from './schema';
import { RecipeCategory } from '@prisma/client';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type State = {
  message?: string | null;
  errors?: {
    title?: string[];
    description?: string[];
    category?: string[];
    ingredients?: string[];
    instructions?: string[];
  };
};

export async function editRecipe(
  recipeId: string,

  formData: FormData
) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as RecipeCategory;
  const ingredients = JSON.parse(formData.get('ingredients') as string);
  const instructions = JSON.parse(formData.get('instructions') as string);

  const user = await assertAuthenticated();

  try {
    const validatedData = RecipeSchema.safeParse({
      title,
      description,
      category,
      ingredients,
      instructions,
    });

    if (!validatedData.success) {
      return {
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Failed to create recipe',
      };
    }

    const foundRecipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        ingredients: true,
        instructions: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!foundRecipe) {
      return {
        message: 'Recipe not found',
      };
    }
    if (foundRecipe.user.id !== user.id) {
      return {
        message: 'You are not authorized to edit this recipe',
      };
    }
    await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title: validatedData.data.title,
        description: validatedData.data.description,
        category: validatedData.data.category,
        ingredients: {
          deleteMany: { recipeId },
          create: validatedData.data.ingredients,
        },
        instructions: {
          deleteMany: { recipeId },
          create: validatedData.data.instructions,
        },
      },
    });

    revalidatePath(`/recipes/${recipeId}`);
    return {
      message: 'Recipe updated successfully!',
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to create recipe',
    };
  }
}
