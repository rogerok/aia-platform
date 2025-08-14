export const envs = {
  authSecret: process.env.AUTH_SECRET,
  authTrustedOriginLocal: process.env.AUTH_TRUSTED_ORIGIN_LOCAL,
  authTrustedOriginRemote: process.env.AUTH_TRUSTED_ORIGIN_REMOTE,
  baseUrl: process.env.BASE_URL,
  dbURl: process.env.NEXT_PUBLIC_DATABASE_URL,
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  githubClientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  openAiKey: process.env.OPEN_AI_KEY,
  streamVideoApiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  streamVideoSecretKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_SECRET_KEY,
} as const;
