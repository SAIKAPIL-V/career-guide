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
        destination: '/',
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
        destination: '/',
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
  experimental: {
    serverComponentsExternalPackages: [
      '@genkit-ai/googleai',
      '@google/generative-ai',
      '@opentelemetry/api',
      '@opentelemetry/sdk-trace-base',
      '@opentelemetry/sdk-trace-node',
      '@opentelemetry/exporter-trace-otlp-http',
      'handlebars'
    ],
  },
};

module.exports = nextConfig;
