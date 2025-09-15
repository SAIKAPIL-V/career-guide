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
