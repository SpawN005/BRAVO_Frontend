/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
