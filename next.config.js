const isProd = process.env.NODE_ENV === 'production';

const internalHost = process.env.TAURI_DEV_HOST || 'localhost';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@ant-design/icons', '@ant-design/icons-svg', 'antd'],
  modularizeImports: {
    '@ant-design/icons': {
      transform: '@ant-design/icons/lib/icons/{{ member }}',
      skipDefaultConversion: true,
    },
  },
  // 开发环境暂时禁用静态导出，避免模块加载问题
  output: isProd ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  // 配置 assetPrefix，否则服务器无法正确解析您的资产。
  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig 