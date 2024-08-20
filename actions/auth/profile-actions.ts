'use server';
import prisma from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { MIN_PASSWORD_LENGTH } from '@/lib/constants';
import { assertAuthenticated } from '@/lib/session';
import { revalidatePath } from 'next/cache';
const UpdateNameSchema = z.object({
  name: z.string().min(2),
});

const UpdateEmailSchema = z.object({
  email: z.string().email(),
});

const UpdatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  }),
  confirmNewPassword: z.string(),
});

export async function updateName(formData: FormData) {
  const user = await assertAuthenticated();

  const validatedData = UpdateNameSchema.safeParse({
    name: formData.get('name') as string,
  });
  console.log(validatedData);

  if (!validatedData.success) {
    return {
      message: 'Invalid name!',
    };
  }

  try {
    const updated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: validatedData.data.name,
      },
    });

    revalidatePath('/profile');
    return {
      newName: updated.name,
      message: 'Name updated successfully!',
    };
  } catch (error) {
    return {
      message: 'An error occurred',
    };
  }
}

export async function updateEmail(formData: FormData) {
  const user = await assertAuthenticated();

  const validatedData = UpdateEmailSchema.safeParse({
    email: formData.get('email') as string,
  });

  if (!validatedData.success) {
    return {
      message: 'Invalid email!',
    };
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        email: validatedData.data.email,
      },
    });
    if (foundUser) {
      return {
        message: 'Email already in use!',
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: validatedData.data.email,
      },
    });

    revalidatePath('/profile');
    return {
      newEmail: updatedUser.email,
      message: 'Email updated successfully!',
    };
  } catch (error) {
    return {
      message: 'An error occurred',
    };
  }
}

export async function updatePassword(formData: FormData) {
  const validatedData = UpdatePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword') as string,
    newPassword: formData.get('newPassword') as string,
    confirmNewPassword: formData.get('confirmNewPassword') as string,
  });
  const user = await assertAuthenticated();
  if (!validatedData.success) {
    return {
      message: validatedData.error.errors[0].message,
    };
  }
  const { currentPassword, newPassword, confirmNewPassword } =
    validatedData.data;
  if (newPassword !== confirmNewPassword) {
    return {
      message: 'Passwords do not match!',
    };
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!foundUser || !foundUser.password) {
      return {
        message: 'User not found or password not set!',
      };
    }

    const isMatch = await bcrypt.compare(currentPassword, foundUser.password);

    if (!isMatch) {
      return {
        message: 'Current password is incorrect!',
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password updated successfully!',
    };
  } catch (error) {
    return {
      message: 'An error occurred',
    };
  }
}
