/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res-console.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "car-rental-system-na26.onrender.com", // ✅ add this
      },
    ],
  },
};

module.exports = {
  images: {
    domains: ["car-rental-system-na26.onrender.com"],
  },
};

module.exports = {
  images: {
    domains: ["car-rental-system-wgtb.onrender.com"],
  },
};

module.exports = nextConfig;
