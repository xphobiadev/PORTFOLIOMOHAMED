/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      recharts: "recharts/lib"
    }
  }
};

export default nextConfig;
