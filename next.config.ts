import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['dockerode', 'ssh2', 'bcryptjs'],
  turbopack: {},
  // Disable features not supported in Vercel
  experimental: {
    // Add any Vercel-specific experimental features here
  },
};

export default nextConfig;