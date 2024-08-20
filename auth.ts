import bycrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/db';
import Credentials from 'next-auth/providers/credentials';
import * as z from 'zod';
import { getUserByEmail } from './data-access/users';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const validatedData = LoginSchema.safeParse(credentials);

        if (validatedData.success) {
          const { email, password } = validatedData.data;

          const foundUser = await getUserByEmail(email);
          if (!foundUser || !foundUser.password) return null;

          const passwordMatch = await bycrypt.compare(
            password,
            foundUser.password
          );

          if (passwordMatch) return foundUser;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }
      if (trigger === 'update' && session?.email) {
        token.email = session.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});
