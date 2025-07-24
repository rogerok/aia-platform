export const routes = {
  agent: (id: string) => `/agents/${id}`,
  agents: () => '/agents',
  home: () => '/',
  meetings: () => '/meetings',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  upgrade: () => '/upgrade',
} as const;
