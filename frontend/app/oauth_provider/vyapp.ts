import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import settings from "../settings";

export interface VyAppProfile extends Record<string, any> {
  username: string;
  email: string;
  sub: string;
}

export function VyApp<P extends VyAppProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "vyapp",
    name: "VyApp",
    type: "oauth",
    wellKnown: `${settings.PUBLIC_URL}/o/.well-known/openid-configuration/`,
    idToken: true,
    checks: ["state", "pkce"],
    authorization: {
      params: {
        scope: "read write openid",
      },
    },
    profile(profile) {
      // console.log("async profile", profile);
      return {
        id: profile.sub,
        name: profile.username,
        email: profile.email,
        image: null,
      };
    },
    options,
  };
}
