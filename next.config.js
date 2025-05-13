
/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
 images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "181.225.255.61",
        port: "9000",
      },
      {
        protocol: "https",
        hostname: "minio-api.aserefood.com",
      },
    ],
  },
};

module.exports = nextConfig