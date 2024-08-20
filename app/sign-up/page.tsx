import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';

async function RegisterPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-primary p-8 dark:bg-gray-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Create Account
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Sign up to start your journey
          </p>
        </div>

        <RegisterForm />

        <div className='mt-6 text-center'>
          <p className='text-gray-600 dark:text-gray-400'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='ml-2 text-orange-500 hover:underline dark:text-orange-400'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
