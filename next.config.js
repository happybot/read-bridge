/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ant-design/icons', '@ant-design/icons-svg'],
  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/lib/icons/{{ member }}',
      skipDefaultConversion: true,
    },
  },
}

module.exports = nextConfig 