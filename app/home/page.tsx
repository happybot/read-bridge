'use client';

import React, { useState, useEffect } from 'react';
import db from '@/services/DB';
import { BookPreview } from '@/types/book';
import dynamic from 'next/dynamic';
import { BookCardSkeleton } from '@/app/components/common/LoadingComponents';

// 懒加载书籍网格组件
const BookGrid = dynamic(
  () => import('@/app/components/BookGrid'),
  { loading: () => <BookGridSkeleton /> }
);

// 书籍网格骨架屏
function BookGridSkeleton() {
  return (
    <div className='p-2 w-full h-full'>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [bookPreviews, setBookPreviews] = useState<BookPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 异步加载书籍数据，避免阻塞渲染
    const loadBooks = async () => {
      try {
        const books = await db.getAllBooksPreview();
        setBookPreviews(books);
      } catch (error) {
        console.error('加载书籍数据失败:', error);
        setBookPreviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (isLoading) {
    return <BookGridSkeleton />;
  }

  return (
    <div className='p-2 w-full h-full'>
      <BookGrid books={bookPreviews} />
    </div>
  );
}