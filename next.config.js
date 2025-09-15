/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'userLoggedIn',
            value: 'true',
          },
        ],
      },
       {
        source: '/login',
        destination: '/dashboard',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'userLoggedIn',
            value: 'true',
          },
        ],
      },
       {
        source: '/signup',
        destination: '/dashboard',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'userLoggedIn',
            value: 'true',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
