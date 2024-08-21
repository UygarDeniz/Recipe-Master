'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div>
      <label htmlFor='query' className='sr-only'>
        Search recipes
      </label>
      <input
        type='text'
        id='query'
        name='query'
        placeholder='Search recipes'
        className='shadow appearance-none border rounded-xl text-lg md:text-xl w-40 md:w-96 py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline'
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}

export default Search;
