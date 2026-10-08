/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@tabler/icons-react', 'gsap', 'three'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  turbopack: {},
};

export default nextConfig;
