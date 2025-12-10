import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { FileResponse } from '@/types/files';
import { usePageStore } from '@/stores/pageStore';
import { useState, useRef, Suspense } from 'react';
import DropDownInline from '../common-ui/DropDownInline';
import { useMobile } from '@/hooks/useMobile';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';

interface FileDetail extends FileResponse {
  isFavorite?: boolean;
}

export default function FileCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: FileDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState<boolean>(false);
  const { pageId } = usePageStore();
  const isMobile = useMobile();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isDropdownArea = target.closest('[data-dropdown]');
    const isButtonArea = target.closest('[data-card-button]');
    const isModalArea = target.closest('[data-ignore-outside-click]');

    if (isDropdownArea || isButtonArea || isModalArea) return;

    // 파일 다운로드
    window.open(item.fileUrl, '_blank');
  };

  const handleMenuClick = () => {
    setIsDropDownInline((v) => !v);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const getFileIconColor = (extension: string): string => {
    const colors: Record<string, string> = {
      PDF: '#FF3B30',
      DOC: '#007AFF',
      DOCX: '#007AFF',
      XLS: '#34C759',
      XLSX: '#34C759',
      PPT: '#FF9500',
      PPTX: '#FF9500',
      JPG: '#5856D6',
      JPEG: '#5856D6',
      PNG: '#5856D6',
      GIF: '#5856D6',
      ZIP: '#8E8E93',
      RAR: '#8E8E93',
    };
    return colors[extension] || '#8E8E93';
  };

  const fileExtension = getFileExtension(item.fileName);
  const iconColor = getFileIconColor(fileExtension);

  return (
    <>
      <div
        className={`group relative flex ${isMobile ? 'h-[170px]' : 'h-[242px]'} flex-col items-center gap-4 rounded-[16px] border border-transparent bg-transparent p-[16px] hover:cursor-pointer ${
          isMobile ? 'min-w-[125px]' : 'min-w-[156px]'
        }`}
        onClick={handleCardClick}
      >
        {/* 파일 아이콘 */}
        <div
          className="bg-gray-5 relative mx-auto flex items-center justify-center rounded-lg"
          style={{
            width: isMobile ? '96px' : '120px',
            height: isMobile ? '96px' : '120px',
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center rounded-lg"
            style={{ backgroundColor: `${iconColor}20` }}
          >
            <span className="text-2xl font-bold" style={{ color: iconColor }}>
              {fileExtension.slice(0, 3)}
            </span>
          </div>
        </div>

        {/* 북마크 버튼 */}
        <button
          data-card-button
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: 북마크 기능 구현
          }}
          aria-label={isBookmark ? '북마크 제거' : '북마크 추가'}
        >
          {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
        </button>

        {/* 파일 이름 */}
        <div className="flex flex-1 flex-col items-center justify-between">
          <p
            className="text-gray-90 line-clamp-2 text-center text-sm font-medium"
            style={{
              WebkitLineClamp: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.fileName}
          </p>

          {/* 파일 정보 */}
          <p className="text-xs text-gray-50">
            {formatFileSize(item.fileSize)}
          </p>

          {/* 메뉴 버튼 */}
          <button
            ref={menuButtonRef}
            data-card-button
            className="absolute right-2 bottom-2 z-10 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick();
            }}
            aria-label="메뉴"
          >
            <CardMenu />
          </button>
        </div>

        {/* 드롭다운 메뉴 */}
        {isDropDownInline && menuButtonRef.current && (
          <Suspense fallback={<DropDownInlineSkeleton />}>
            <DropDownInline
              itemType="file"
              itemId={item.fileId}
              anchorElement={menuButtonRef.current}
              onClose={() => setIsDropDownInline(false)}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}
