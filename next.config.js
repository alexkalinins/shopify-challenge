module.exports = {
    async redirects() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.nasa.gov/planetary/:path*',
          permanent: true,
        },
      ]
    },
  }