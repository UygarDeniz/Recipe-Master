'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
function Search({ query }: { query: string }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, 1000);
  return (
    <div>
      <input
        type='text'
        name='query'
        placeholder='Search recipes'
        className="shadow appearance-none border rounded-xl text-lg md:text-xl w-40 md:w-96 py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={query}
      />
    </div>
  );
}

export default Search;
