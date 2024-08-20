import prisma from '@/lib/db';
import { Prisma, RecipeCategory } from '@prisma/client';
import { PAGINATION_PAGE_SIZE } from '@/lib/constants';

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      ingredients: true,
      instructions: true,
      likes: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return recipe;
};

export async function getAllFilteredRecipes(
  query: string,
  page: number,
  category?: string,
  userId?: string
) {
  const pageSize = PAGINATION_PAGE_SIZE;

  const whereClause: Prisma.RecipeWhereInput = {
    OR: query
      ? [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      : undefined,
    category: category ? (category as RecipeCategory) : undefined,
    userId: userId ? userId : undefined,
  };

  const recipes = await prisma.recipe.findMany({
    where: whereClause,
    include: {
      user: {
        select: {
          name: true,
        },
      },
      likes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: pageSize * (page - 1),
    take: pageSize,
  });

  return recipes;
}

export async function getTotalRecipePages(category?: string, query?: string, userId?: string) {
  const pageSize = PAGINATION_PAGE_SIZE;

  const whereClause: Prisma.RecipeWhereInput = {
    OR: query
      ? [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      : undefined,
    category: category ? (category.toUpperCase() as RecipeCategory) : undefined,
    userId: userId ? userId : undefined,
  };

  const totalRecipes = await prisma.recipe.count({
    where: whereClause,
  });

  return Math.ceil(totalRecipes / pageSize);
}



