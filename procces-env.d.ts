declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_PASSWORD: string;
      AUTH_SECRET: string;
      AUTH_URL: string;
      NEXT_PUBLIC_DATABASE_URL: string;
    }
  }
}
