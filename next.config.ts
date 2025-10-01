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
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8081',
        pathname: '/image/**',
        search: ''
      }
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
