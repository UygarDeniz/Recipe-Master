'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

function ModeChange() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className='rounded-xl border border-black p-5 dark:border-white' />
    );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='flex items-center rounded-xl border border-black p-2 hover:bg-gray-100 dark:border-white dark:hover:bg-gray-700'
      >
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
      {dropdownOpen && (
        <div className='absolute z-10 right-0 mt-2 w-28 rounded-xl border border-black bg-white shadow-lg dark:border-white dark:bg-gray-800'>
          <button
            onClick={() => handleThemeChange('light')}
            className='flex w-full items-center rounded-t-xl px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <Sun className='mr-2' /> Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className='flex w-full items-center rounded-b-xl px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <Moon className='mr-2' /> Dark
          </button>
        </div>
      )}
    </div>
  );
}

export default ModeChange;
