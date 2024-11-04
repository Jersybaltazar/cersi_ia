/** @type {import('next').NextConfig} */
const nextConfig = {
  reactProductionProfiling: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "wordpress-1358235-4996494.cloudwaysapps.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(api|dashboard|integration)/:path*",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
