import Link from 'next/link';
import Button from './Button';

export default function CommunitySection() {
  return (
    <section className='p-16  bg-gray-700 text-center'>
      <h2 className='text-4xl font-semibold text-white mb-4 '>
        Join Our Community
      </h2>
      <p className='text-lg text-white mb-8'>
        Sign up today and start your culinary journey!
      </p>
      <Button variant='primary' size='large' className='rounded-full' asChild>
        <Link href='/sign-up'>Sign Up Now</Link>
      </Button>
    </section>
  );
}
