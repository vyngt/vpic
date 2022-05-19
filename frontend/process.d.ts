declare namespace NodeJS {
  export interface ProcessEnv {
    APP_PUBLIC_URL: string;
    APP_INTERNAL_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_URL_INTERNAL: string;
    NEXTAUTH_SECRET: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
  }
}
