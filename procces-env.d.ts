declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_PASSWORD: string;
      AUTH_SECRET: string;
      AUTH_URL: string;
      NEON_DATABASE_URL: string;
    }
  }
}
