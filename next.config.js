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
      '@genkit-ai/ai',
      '@genkit-ai/core',
      '@genkit-ai/googleai',
      '@google/generative-ai',
      '@opentelemetry/api',
      '@opentelemetry/sdk-trace-base',
      '@opentelemetry/sdk-trace-node',
      '@opentelemetry/exporter-trace-otlp-http',
      'firebase-admin',
      'long',
      'protobufjs',
      'handlebars'
    ],
  },
};

module.exports = nextConfig;
