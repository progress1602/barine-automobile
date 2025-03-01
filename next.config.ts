/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res-console.cloudinary.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
