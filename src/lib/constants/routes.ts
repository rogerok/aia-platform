export const routes = {
  agent: (id: string) => `/agents/${id}`,
  agents: () => '/agents',
  call: (id: string) => `/call/${id}`,
  home: () => '/',
  meeting: (id: string) => `/meetings/${id}`,
  meetings: () => '/meetings',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  upgrade: () => '/upgrade',
} as const;
