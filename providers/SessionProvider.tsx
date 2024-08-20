import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export  async function NextSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
  );
}
