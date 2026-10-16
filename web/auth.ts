import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { authConfig } from '@/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'student@kiit.ac.in' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        await connectToDatabase();

        const user = await User.findOne({ email: String(credentials.email).toLowerCase() }).select('+passwordHash');
        if (!user || !user.passwordHash) {
          throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(String(credentials.password), user.passwordHash);
        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.profileImageUrl || null,
        };
      },
    }),
  ],
});

