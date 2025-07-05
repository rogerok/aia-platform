export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      BASE_URL: string;
      NEXT_PUBLIC_DATABASE_URL: string;
      NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
      NEXT_PUBLIC_GITHUB_CLIENT_SECRET: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    }
  }
}
