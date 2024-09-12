/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://34.67.228.203:4000/:path*' // Proxy to your backend
        }
      ];
    },
  };
  
  export default nextConfig;
  