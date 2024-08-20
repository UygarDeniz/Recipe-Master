'use server';

import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { redirect } from 'next/navigation';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type State = {
  message?: string | null;
};

export async function loginUser(prevState: State, formData: FormData) {
  const validatedData = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedData.success) {
    return {
      message: 'Invalid fields!',
    };
  }

  const { email, password } = validatedData.data;
  try {
    const user = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!user) {
      return {
        message: 'Invalid email or password',
      };
    }
    redirect('/');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid email or password',
          };
        default:
          return {
            message: 'An error occurred',
          };
      }
    }
    throw error;
  }
}
