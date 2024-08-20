import Link from 'next/link';
import { Pacifico } from 'next/font/google';
import { cn } from '@/lib/utils';
import ModeToggle from './ModeToggle';
import UserMenu from './UserMenu';

const pasifico = Pacifico({ weight: '400', subsets: ['cyrillic-ext'] });

function Header() {
  return (
    <header className='border-b py-4 bg-white dark:bg-gray-900 dark:border-gray-700'>
      <div className='container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row'>
        <Link
          href='/'
          className={cn(
            'text-3xl text-orange-500 dark:text-white mb-2 sm:mb-0',
            pasifico.className
          )}
        >
          Recipe Master
        </Link>
        <nav className='flex  justify-center space-x-4 font-semibold text-lg text-gray-900 dark:text-gray-300 mb-2 sm:mb-0'>
          <Link
            href='/recipes'
            className='hover:text-orange-500 dark:hover:text-orange-400'
          >
            Recipes
          </Link>
          <Link
            href='/recipes/create'
            className='hover:text-orange-500 dark:hover:text-orange-400'
          >
            Add Recipe
          </Link>
          <Link
            href='/recipes/my-recipes'
            className='hover:text-orange-500 dark:hover:text-orange-400'
          >
            My Recipes
          </Link>
        </nav>
        <div className='flex items-center space-x-4'>
          <UserMenu />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
