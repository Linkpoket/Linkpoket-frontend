import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { FileResponse } from '@/types/files';
import { useState, useRef, Suspense } from 'react';
import DropDownInline from '../common-ui/DropDownInline';
import { useMobile } from '@/hooks/useMobile';
import { DropDownInlineSkeleton } from '../skeleton/DropdownInlineSkeleton';

interface FileDetail extends FileResponse {
  isFavorite?: boolean;
}

export default function FileCard({ item }: { item: FileDetail }) {
  const [isDropDownInline, setIsDropDownInline] = useState<boolean>(false);
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

        {/* 파일 이름 */}
        <div className="flex flex-1 flex-col items-center justify-between">
          <div className="flex flex-col gap-1 text-center">
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
            {!isMobile && (
              <p className="text-xs text-gray-50">
                {formatFileSize(item.fileSize)}
              </p>
            )}
          </div>

          <div className="mt-2 flex items-center justify-end">
            <div className="relative">
              <button
                ref={menuButtonRef}
                data-card-button
                className="cursor-pointer p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClick();
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                style={{ touchAction: 'manipulation' }}
                aria-label="메뉴 열기"
              >
                <CardMenu />
              </button>
            </div>
          </div>
        </div>

        {/* 드롭다운 메뉴 */}
        {isDropDownInline && menuButtonRef.current && (
          <Suspense fallback={<DropDownInlineSkeleton />}>
            <DropDownInline
              id={item.fileId}
              type="file"
              initialTitle={item.fileName}
              initialLink={item.fileUrl}
              isDropDownInline={isDropDownInline}
              setIsDropDownInline={setIsDropDownInline}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}
