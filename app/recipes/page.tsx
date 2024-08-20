import CategoryFilter from '@/components/CategoryFilter';
import Loading from '@/components/Loading';
import Pagination from '@/components/PaginationButtons';
import RecipeList from '@/components/RecipeList';
import Search from '@/components/Search';
import { getTotalRecipePages } from '@/data-access/recipes';
import { Suspense } from 'react';
import { z } from 'zod';
type PageProps = {
  query: string;
  category: string;
  page: number;
};
const querySchema = z.string().optional();
const categorySchema = z.string().optional();
const pageSchema = z.number().int().positive();

async function page({ searchParams }: { searchParams: PageProps }) {
  const query = querySchema.parse(searchParams?.query) || '';
  const selectedCategory = categorySchema.parse(searchParams?.category) || '';
  const currentPage = pageSchema.parse(Number(searchParams?.page) || 1);

  const totalPages = await getTotalRecipePages(selectedCategory, query);

  return (
    <div className='min-h-screen bg-primary py-10  dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100'>
          All Recipes
        </h1>
        <div className='flex justify-between items-end mb-6'>
          <Search query={query} />
          <CategoryFilter selectedCategory={selectedCategory} />
        </div>

        <Suspense key={selectedCategory + query} fallback={<Loading />}>
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
