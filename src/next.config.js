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
