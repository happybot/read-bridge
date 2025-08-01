'use client';

import { Row, Col, Button } from 'antd';
import { BookPreview, Resource } from '@/types/book';
import dynamic from 'next/dynamic';
import { useStyleStore } from '@/store/useStyleStore';
import { useRouter } from 'next/navigation';
import { useSiderStore } from '@/store/useSiderStore';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

// 懒加载重量级组件
const BookUploader = dynamic(
  () => import('@/app/components/BookUploader'),
  { loading: () => <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg flex items-center justify-center">上传中...</div> }
);

const BookDetailsModal = dynamic(
  () => import('@/app/components/BookDetailsModal'),
  { loading: () => null }
);

interface BookGridProps {
  books: BookPreview[];
}

export default function BookGrid({ books }: BookGridProps) {
  const { itemsPerRow, gutterX, gutterY } = useStyleStore()
  const router = useRouter();
  const { setReadingId } = useSiderStore()
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string>('');

  const onBookClick = (id: string) => {
    setReadingId(id)
    router.push(`/read`);
  }

  const showDetailsModal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBookId(id);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  return (
    <div className="w-full">
      <Row gutter={[gutterX, gutterY]}>
        {books.map((book) => (
          <Col key={book.id} span={24 / itemsPerRow}>
            <div className="cursor-pointer">
              <div className="aspect-[3/4] w-full overflow-hidden" onClick={() => onBookClick(book.id)}>
                <BookCover cover={book.cover} title={book.title} />
              </div>
              <div className="mt-2 text-center">
                <div className="font-medium truncate">{book.title}</div>
                <div className="flex items-center justify-center">
                  {book.author && (
                    <div className="text-sm text-gray-500 truncate">{book.author}</div>
                  )}
                  <Button
                    type="text"
                    size="small"
                    icon={<InfoCircleOutlined />}
                    onClick={(e) => showDetailsModal(book.id, e)}
                  />
                </div>
              </div>
            </div>
          </Col>
        ))}
        <Col span={24 / itemsPerRow}>
          <div className="aspect-[3/4] w-full">
            <BookUploader />
          </div>
        </Col>
      </Row>

      <BookDetailsModal
        open={detailsModalOpen}
        onClose={closeDetailsModal}
        bookId={selectedBookId}
      />
    </div>
  );
}

function handleBase64(base64: string) {
  return `data:image/jpeg;base64,${base64}`
}

const BookCover = ({ cover, title }: { cover: Resource | undefined, title: string }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const imageCSS = `
    w-full
    h-full
    rounded-lg
    transition-opacity duration-300
    ${imgLoaded ? 'opacity-100' : 'opacity-0'}
  `
  
  const noCoverCSS = `
    w-full
    h-full
    flex
    items-center
    justify-center
    border
    border-[var(--ant-color-border)]
    rounded-lg
    bg-[var(--ant-color-bg-elevated)]
    dark:bg-[var(--ant-color-bg-elevated)]
  `
  
  return (
    cover && !imgError ? (
      <div className="relative w-full h-full">
        <img 
          className={imageCSS}
          src={handleBase64(cover.data)} 
          alt={title}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          loading="lazy"
          decoding="async"
        />
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    ) : (
      <div className={noCoverCSS}>
        No Cover
      </div>
    )
  )
}
