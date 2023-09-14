/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pemm-directus.preview.im",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "cms.ethiopicmary.com",
      },
    ],
  },
};

module.exports = nextConfig;
