export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      AUTH_TRUSTED_ORIGIN_LOCAL: string;
      AUTH_TRUSTED_ORIGIN_REMOTE: string;
      BASE_URL: string;
      NEXT_PUBLIC_DATABASE_URL: string;
      NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
      NEXT_PUBLIC_GITHUB_CLIENT_SECRET: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
      NEXT_PUBLIC_STREAM_VIDEO_API_KEY: string;
      NEXT_PUBLIC_STREAM_VIDEO_SECRET_KEY: string;
      OPEN_AI_KEY: string;
    }
  }
}
