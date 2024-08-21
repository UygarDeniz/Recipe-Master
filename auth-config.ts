import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUserByEmail } from './data-access/users';
import bycrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth"
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default {
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
} satisfies NextAuthConfig;
