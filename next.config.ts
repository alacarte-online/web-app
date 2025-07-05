import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  redirects: redirects,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.alacarteonline.co.uk',
        pathname: '/image/**',
        search: ''
      },
    ],
  }
};

export default nextConfig;

async function redirects() {
  return [
    {
      source: '/',
      destination: '/browse',
      permanent: true,
    },
  ]
}
