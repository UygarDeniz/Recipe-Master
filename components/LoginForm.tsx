'use client';
import { useFormState } from 'react-dom';
import { loginUser, State } from '@/actions/auth/login-action';
import FormButton from './FormButton';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

function LoginForm() {
  const initialState: State = { message: null };
  const [state, formAction] = useFormState(loginUser, initialState);

  return (
    <form action={formAction}>
      <div
        className={cn(
          'mb-2 mt-4 flex min-h-[3.25rem] w-full items-center justify-center gap-x-2 rounded-md px-4',
          {
            'bg-red-500': state?.message,
          }
        )}
      >
        {state?.message && (
          <>
            <CircleAlert />
            <p className='w-full rounded text-sm text-white'>{state.message}</p>
          </>
        )}
      </div>
      <div className='mb-2'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-400 dark:focus:ring-orange-400'
          required
          autoComplete='email'
        />
      </div>
      <div className='mb-2'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-400 dark:focus:ring-orange-400'
          required
        />
      </div>

      <div className='mt-10 text-center'>
        <FormButton variant="primary" formName='Login' />
      </div>
    </form>
  );
}

export default LoginForm;
