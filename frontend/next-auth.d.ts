import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    // user:
    access_token?: string;
    access_token_expires?: number;
    refresh_token?: string;
    user?: User;
    error?: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string;
  }
}
