export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      BASE_URL: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXT_PUBLIC_DATABASE_URL: string;
    }
  }
}
