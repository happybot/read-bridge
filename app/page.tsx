"use client"

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 懒加载首页内容，减少首屏加载时间
const HomeContent = dynamic(
  () => import('@/app/home/page'),
  { 
    loading: () => <div className="flex items-center justify-center h-screen">加载中...</div>,
    ssr: false 
  }
);

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">加载中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
