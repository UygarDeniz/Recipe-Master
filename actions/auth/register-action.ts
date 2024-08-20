'use server';
import prisma from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data-access/users';
import { MIN_PASSWORD_LENGTH } from '@/lib/constants';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  }),
  confirmPassword: z.string().min(6, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
});

export type State = {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    name?: string[];
  };
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedData = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    name: formData.get('name'),
  });

  if (!validatedData.success) {
    console.log(validatedData.error);
    return {
      errors: validatedData.error.flatten().fieldErrors,
      message: 'Failed to register user',
    };
  }

  const { email, password, confirmPassword, name } = validatedData.data;
  if (password !== confirmPassword) {
    return {
      errors: { confirmPassword: ['Passwords do not match'] },
      message: 'Failed to register user',
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errors: { email: ['Email already exists!'] },
        message: 'Failed to register user',
      };
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo: '/',
    });

    return {
      message: 'User registered successfully',
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      return {
        message: 'Failed to register user',
      };
    }
    throw error;
  }
}
