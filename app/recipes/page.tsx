import CategoryFilter from '@/components/CategoryFilter';
import Loading from '@/components/Loading';
import Pagination from '@/components/PaginationButtons';
import RecipeList from '@/components/RecipeList';
import Search from '@/components/Search';
import { getTotalRecipePages } from '@/data-access/recipes';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'All Recipes',
};
type PageProps = {
  query?: string;
  category?: string;
  page?: number;
};

async function page({ searchParams }: { searchParams?: PageProps }) {
  const query = searchParams?.query || '';
  const selectedCategory = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getTotalRecipePages(selectedCategory, query);

  return (
    <div className='min-h-screen bg-primary py-10  dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100'>
          All Recipes
        </h1>
        <div className='flex justify-between items-end mb-6'>
          <Search />
          <CategoryFilter />
        </div>

        <Suspense key = {selectedCategory + query + currentPage} fallback={<Loading />}>
          <RecipeList
            currentPage={currentPage}
            category={selectedCategory}
            query={query}
          />
        </Suspense>
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default page;
