import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkEnvs = (envs: Record<string, string | undefined>) => {
  const missing = Object.entries(envs)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => !value?.trim())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([key, _]) => key)
    .join(', ');

  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing}`);
  }
};
