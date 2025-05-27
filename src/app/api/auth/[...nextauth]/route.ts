// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Use the v4 compatible adapter
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Example OAuth provider
import prisma from "@/lib/prisma"; // Ensure this path points to your Prisma client instance
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma), // Use the Prisma adapter compatible with NextAuth v4
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null; // Or throw an error
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          // User not found or password not set (e.g., OAuth user trying credentials)
          return null; // Or throw an error
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          return null; // Or throw an error
        }

        // Return user object if credentials are valid (excluding password)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role, // Make sure role is included
        };
      },
    }),
    // Example Google Provider (Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env)
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // Add other providers like GitHub, Facebook etc.
  ],
  session: {
    strategy: "jwt", // Using JWT for session strategy is common
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirect to this page if sign-in is required
    // error: '/auth/error', // Custom error page
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and user id / role to the token right after signin
      if (account && user) {
        // User is available on initial sign in
        token.accessToken = account.access_token;
        token.id = user.id;
        // @ts-ignore NextAuth User type might not have role by default, extend it or cast
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // @ts-ignore
      session.accessToken = token.accessToken;
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
