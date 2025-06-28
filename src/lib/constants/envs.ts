export const envs = {
  authSecret: process.env.AUTH_SECRET,
  baseUrl: process.env.BASE_URL,
  dbURl: process.env.NEXT_PUBLIC_DATABASE_URL,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
} as const;
