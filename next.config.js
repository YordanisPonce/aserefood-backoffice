
/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [{
      protocol: "http", 
      hostname: "181.225.255.61",
      port: "9000"
    }]
  }
};

module.exports = nextConfig