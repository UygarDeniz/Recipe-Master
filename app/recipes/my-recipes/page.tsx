import { Suspense } from 'react';
import { assertAuthenticated } from '@/lib/session';
import { getTotalRecipePages } from '@/data-access/recipes';
import { z } from 'zod';
import RecipeList from '@/components/RecipeList';
import Loading from '@/components/Loading';
import Pagination from '@/components/PaginationButtons';
import Search from '@/components/Search';
import CategoryFilter from '@/components/CategoryFilter';
import Link from 'next/link';
type PageProps = {
  query: string;
  category: string;
  page: number;
};
const querySchema = z.string().optional();
const categorySchema = z.string().optional();
const pageSchema = z.number().int().positive();

export default async function RecipePage({
  searchParams,
}: {
  searchParams: PageProps;
}) {
  const query = querySchema.parse(searchParams?.query) || '';
  const selectedCategory = categorySchema.parse(searchParams?.category) || '';
  const currentPage = pageSchema.parse(Number(searchParams?.page) || 1);

  const user = await assertAuthenticated();
  if (!user || !user?.id) return;

  const totalPages = await getTotalRecipePages(
    selectedCategory,
    query,
    user.id
  );
  return (
    <div className='min-h-screen py-10 bg-primary dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100'>
          My Recipes
        </h1>

        <div className='flex justify-between  mb-6 items-end'>
          <div className='flex items-end space-x-6'>
            <Search />
            <CategoryFilter />
          </div>
          <Link
            href='/recipes/my-recipes/liked'
            className='text-sm md:text-lg hover:underline text-orange-500 hover:text-orange-700 font-semibold'
          >
            View Liked Recipes
          </Link>
        </div>

        <Suspense key={selectedCategory + query} fallback={<Loading />}>
          <RecipeList
            currentPage={currentPage}
            category={selectedCategory}
            query={query}
            userId={user.id}
          />
        </Suspense>

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
