export const envs = {
  authSecret: process.env.AUTH_SECRET,
  baseUrl: process.env.BASE_URL,
  dbURl: process.env.NEXT_PUBLIC_DATABASE_URL,
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  githubClientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  streamVideoApiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  streamVideoSecretKey: process.env.STREAM_VIDEO_SECRET_KEY,
} as const;
