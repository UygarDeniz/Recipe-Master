import prisma from '@/lib/db';
import { Prisma, RecipeCategory } from '@prisma/client';
import { PAGINATION_PAGE_SIZE } from '@/lib/constants';

export const getRecipeById = async (id: string) => {
  try {
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
  } catch (error) {
    throw new Error("Couldn't get recipe please try again");
  }
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

  try {
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
  } catch (error) {
    throw new Error("Couldn't get recipes please try again");
  }
}

export async function getTotalRecipePages(
  category?: string,
  query?: string,
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
    category: category ? (category.toUpperCase() as RecipeCategory) : undefined,
    userId: userId ? userId : undefined,
  };

  try {
    const totalRecipes = await prisma.recipe.count({
      where: whereClause,
    });

    return Math.ceil(totalRecipes / pageSize);
  } catch (error) {
    throw new Error("Couldn't get total pages please try again");
  }
}

export async function getUserLikedRecipes(
  userId: string,
  page: number,
  query?: string,
  category?: string
) {
  const pageSize = PAGINATION_PAGE_SIZE;

  const whereClause: Prisma.RecipeWhereInput = {
    likes: {
      some: {
        userId: userId,
      },
    },
    OR: query
      ? [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      : undefined,
    category: category ? (category as RecipeCategory) : undefined,
  };
  try {
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
  } catch (error) {
    throw new Error("Couldn't get liked recipes please try again");
  }
}

export async function getTotalLikedRecipePages(
  userId: string,
  query?: string,
  category?: string
) {
  const pageSize = PAGINATION_PAGE_SIZE;

  const whereClause: Prisma.RecipeWhereInput = {
    likes: {
      some: {
        userId: userId,
      },
    },
    OR: query
      ? [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ]
      : undefined,
    category: category ? (category as RecipeCategory) : undefined,
  };
  try {
    const totalRecipes = await prisma.recipe.count({
      where: whereClause,
    });
    return Math.ceil(totalRecipes / pageSize);
  } catch (error) {
    throw new Error("Couldn't get total pages please try again");
  }
}
