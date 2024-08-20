'use client';
import { useFormState } from 'react-dom';
import { createUser, State } from '@/actions/auth/register-action';
import { MIN_PASSWORD_LENGTH } from '@/lib/constants';
import FormButton from './FormButton';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

function RegisterForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createUser, initialState);

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
      <div>
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
        />
        <div className='min-h-[1.25rem]'>
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p key={error} className='ml-2 text-sm text-red-500'>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className='mt-2'>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-400 dark:focus:ring-orange-400'
          minLength={2}
          required
        />
      </div>
      {state.errors?.name &&
        state.errors.name.map((error: string) => (
          <p key={error} className='ml-2 text-sm text-red-500'>
            {error}
          </p>
        ))}
      <div className='mt-2 '>
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
          minLength={MIN_PASSWORD_LENGTH}
        />
        <div className='min-h-[1.25rem]'>
          {state.errors?.password &&
            state.errors.password.map((error: string) => (
              <p key={error} className='ml-2 text-sm text-red-500'>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className='mt-2'>
        <label
          htmlFor='confirm-password'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Confirm Password
        </label>
        <input
          type='password'
          id='confirm-password'
          name='confirmPassword'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-400 dark:focus:ring-orange-400'
          required
          minLength={MIN_PASSWORD_LENGTH}
        />
        <div className='min-h-[1.25rem]'>
          {state.errors?.confirmPassword &&
            state.errors.confirmPassword.map((error: string) => (
              <p key={error} className='ml-2 text-sm text-red-500'>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className='mt-10 text-center'>
        <FormButton variant="primary" formName='Sign Up' />
      </div>
    </form>
  );
}

export default RegisterForm;
