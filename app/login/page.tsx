import LoginForm from '../../components/LoginForm';
import Link from 'next/link';

function Login() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-primary p-8 dark:bg-gray-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Login to your account
          </h1>
        </div>

        <LoginForm />

        <div className='mt-6 text-center'>
          <p className='text-gray-600 dark:text-gray-400'>
            Don&apos;t have an account?
            <Link
              href='/sign-up'
              className='ml-2 text-orange-500 hover:underline dark:text-orange-400'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
