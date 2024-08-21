'use server';
import prisma from '@/lib/db';
import { assertAuthenticated } from '@/lib/session';
import { Ingredient, Instruction } from '@/lib/types';
import { RecipeCategory } from '@prisma/client';
import { RecipeSchema } from './schema';

export type State = {
  message?: string | null;
  errors?: {
    title?: string[];
    description?: string[];
    category?: string[];
    ingredients?: string[];
    instructions?: string[];
    imageURL?: string[];
  };
};

export async function createRecipe(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as RecipeCategory;
  const ingredients = JSON.parse(
    formData.get('ingredients') as string
  ) as Ingredient[];
  const instructions = JSON.parse(
    formData.get('instructions') as string
  ) as Instruction[];
  const imageURL = formData.get('image-url') as string;

  const user = await assertAuthenticated();

  try {
    const validatedData = RecipeSchema.safeParse({
      title,
      description,
      category,
      ingredients,
      instructions,
      imageURL
    });

    if (!validatedData.success) {
      return {
        errors: validatedData.error.flatten().fieldErrors,
        message: 'Failed to create recipe',
      };
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        userId: user.id as string,
        title,
        description,
        category: category as RecipeCategory,
        ingredients: { create: ingredients },
        instructions: { create: instructions },
        image : imageURL
      },
    });
    return {
      message: 'Recipe created successfully!',
      newRecipeId: newRecipe.id,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to create recipe',
    };
  }
}
