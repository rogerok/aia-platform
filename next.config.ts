import type { NextConfig } from 'next';

import { envs } from '@/lib/constants/envs';
import { checkEnvs } from '@/lib/utils';

checkEnvs(envs);

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    envs.authTrustedOriginRemote,
    envs.authTrustedOriginLocal,
  ],
};

export default nextConfig;
