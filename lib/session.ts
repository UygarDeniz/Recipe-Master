import { auth } from '@/auth';
import { AuthenticationError } from '@/lib/errors';

export const getCurrentUser = async () => {
  const session = await auth();

  if (session?.user) {
    return session.user;
  }

  return null;
};

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthenticationError();
  }

  return user;
};
