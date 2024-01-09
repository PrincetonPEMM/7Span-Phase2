/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about/mission#our-mission",
        permanent: true,
      },
    ];
  },
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
