/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, // or true — just pick one style
  async redirects() {
    return [
      {
        source: '/jobs/',
        destination: '/jobs',
        permanent: true,
      },
      {
        source: '/jobs/apply/:slug/',
        destination: '/jobs/apply/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
