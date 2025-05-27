// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client"; // Import your Role enum

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string | null; // Add id
      role?: Role | null; // Add role
    } & DefaultSession["user"]; // Extends the default user (name, email, image)
    accessToken?: string | null; // If you added accessToken to session
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the user object returned by the `CredentialsProvider`'s `authorize` callback.
   */
  interface User extends DefaultUser {
    role?: Role | null; // Add role here if your authorize callback returns it
    // Ensure other fields returned by authorize (like id) are included if not in DefaultUser
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id?: string | null;
    role?: Role | null;
    accessToken?: string | null; // If you added accessToken to token
  }
}
