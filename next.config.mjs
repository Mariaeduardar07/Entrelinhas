/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'riomemorias.com.br',
      },
      {
        protocol: 'https',
        hostname: 'sdmntprnorthcentralus.oaiusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'sdmntprsouthcentralus.oaiusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'sdmntprwestus3.oaiusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.oaiusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
};

export default nextConfig;
