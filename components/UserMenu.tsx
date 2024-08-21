import { getCurrentUser } from '@/lib/session';
import Button from './Button';
import Link from 'next/link';
import { CircleUser } from 'lucide-react';

async function UserMenu() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className='flex items-center md:space-x-4'>
        <Link href='/profile'>
          <CircleUser size={39} />
        </Link>
      </div>
    );
  }

  return (
    <div className='flex space-x-4'>
      <Button variant='primary' className='hidden md:block' asChild>
        <Link href='/login'>Log In</Link>
      </Button>
      <Button variant='secondary' asChild className='px-2 md:px-4'>
        <Link href='/sign-up'>Sign Up</Link>
      </Button>
    </div>
  );
}

export default UserMenu;
