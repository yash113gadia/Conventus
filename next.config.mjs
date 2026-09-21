/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
      return [
        { source: '/registration', destination: '/cmun-connect', permanent: true },
        { source: '/RegistrationForm', destination: '/cmun-connect', permanent: true },
        { source: '/DelegateRegis', destination: '/cmun-connect', permanent: true },
        { source: '/OCregis', destination: '/cmun-connect', permanent: true },
        { source: '/status', destination: '/cmun-connect', permanent: false },
      ];
    },
    images: {
      domains: ['randomuser.me', 'unsplash.com', 'images.unsplash.com', 'uifaces.co'],
    },
    webpack: (config, { dev }) => {
      // Disable Webpack disk caching in development to eliminate HMR filesystem lock race conditions
      if (dev) {
        config.cache = false;
      }
      return config;
    },
  }
  
export default nextConfig;
