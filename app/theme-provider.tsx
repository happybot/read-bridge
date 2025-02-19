'use client';

import { ConfigProvider } from 'antd';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          // TODO 这里可以自定义主题
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
} 