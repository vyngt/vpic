import NextAuth from "next-auth";
import { VyApp } from "../../../app/oauth_provider";
import settings from "../../../app/settings";
import type { JWT } from "next-auth/jwt";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface JWTToken {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
  scope: string;
  refresh_token: string;
}

/**
 * Takes a token, and returns a new token with updated
 * `access_token` and `access_token_expires`. If an error occurs,
 * returns the old token and an error property
 */
async function refresh_access_token(token: JWT) {
  try {
    const data = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token ? token.refresh_token : "",
    };
    const url = `${settings.PUBLIC_URL}/o/token/`;
    const body = new URLSearchParams();
    body.append("client_id", data.client_id);
    body.append("client_secret", data.client_secret);
    body.append("grant_type", data.grant_type);
    body.append("refresh_token", data.refresh_token);
    const config: AxiosRequestConfig = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const res: AxiosResponse<JWTToken> = await axios.post(url, body, config);
    const refreshed_token = res.data;

    return {
      ...token,
      access_token: refreshed_token.access_token,
      access_token_expires: Date.now() + refreshed_token.expires_in * 1000,
      refresh_token: refreshed_token.refresh_token ?? token.refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    VyApp({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.user = user;
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        if (account.expires_at) {
          token.access_token_expires = account.expires_at * 1000;
        }
        return token;
      }

      if (
        token.access_token_expires &&
        Date.now() < token.access_token_expires
      ) {
        return token;
      }
      // return token;
      return refresh_access_token(token);
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.error = token.error;
      return session;
    },
  },
  // debug: true,
});
