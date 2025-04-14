// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    position: 'bottom-right', // Updated from buildActivityPosition
    reactDevOverlay: false, // Still valid to suppress useLayoutEffect warning
  },
};

export default nextConfig;