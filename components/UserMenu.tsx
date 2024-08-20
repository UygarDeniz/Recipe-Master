import { getCurrentUser } from '@/lib/session';
import Button from './Button';
import Link from 'next/link';
import { CircleUser } from 'lucide-react';

async function UserMenu() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className='flex items-center space-x-4'>
        <Link href='/profile'>
          <CircleUser size={39} />
        </Link>
      </div>
    );
  }

  return (
    <div className='flex space-x-4'>
      <Button variant='primary' asChild>
        <Link href='/login'>Log In</Link>
      </Button>
      <Button variant='secondary' asChild>
        <Link href='/sign-up'>Sign Up</Link>
      </Button>
    </div>
  );
}

export default UserMenu;
