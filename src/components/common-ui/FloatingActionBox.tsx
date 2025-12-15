import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';

export default function FloatingActionBox() {
  const { openLinkModal, openFileModal, openFolderModal } = useModalStore();
  const [left, setLeft] = useState('50%');

  useEffect(() => {
    const updatePosition = () => {
      const main = document.getElementById('app-scroll-container');
      if (main) {
        const rect = main.getBoundingClientRect();
        setLeft(`${rect.left + rect.width / 2}px`);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleAddLink = () => {
    openLinkModal();
  };

  const handleAddFile = () => {
    openFileModal();
  };

  const handleAddFolder = () => {
    openFolderModal();
  };

  return (
    <div
      className="fixed bottom-16 z-[10000] -translate-x-1/2"
      style={{ left }}
    >
      <div className="flex items-center justify-center gap-8 rounded-[20px] bg-white px-8 py-6 shadow-lg">
        {/* 링크 추가 버튼 */}
        <button
          onClick={handleAddLink}
          className="flex flex-col items-center justify-center gap-1"
          aria-label="링크 추가"
        >
          <div className="bg-gray-10 hover:bg-gray-20 active:bg-gray-30 relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
            {/* 클립 아이콘 */}
            <svg
              className="text-gray-90 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            {/* 작은 + 아이콘 (우상단) */}
            <div className="border-gray-30 absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-white">
              <svg
                className="text-gray-90 h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <span className="text-gray-90 text-xs font-medium">링크 추가</span>
        </button>

        {/* 파일 추가 버튼 */}
        <button
          onClick={handleAddFile}
          className="flex flex-col items-center justify-center gap-1"
          aria-label="파일 추가"
        >
          <div className="bg-gray-10 hover:bg-gray-20 active:bg-gray-30 relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
            {/* 프레임 아이콘 */}
            <svg
              className="text-gray-90 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                strokeWidth={2}
              />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 15l-5-5L5 21"
              />
            </svg>
            {/* 작은 + 아이콘 (우상단) */}
            <div className="border-gray-30 absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-white">
              <svg
                className="text-gray-90 h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <span className="text-gray-90 text-xs font-medium">파일 추가</span>
        </button>

        {/* 폴더 추가 버튼 */}
        <button
          onClick={handleAddFolder}
          className="flex flex-col items-center justify-center gap-1"
          aria-label="폴더 추가"
        >
          <div className="bg-gray-10 hover:bg-gray-20 active:bg-gray-30 relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
            {/* 폴더 아이콘 */}
            <svg
              className="text-gray-90 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            {/* 작은 + 아이콘 (우상단) */}
            <div className="border-gray-30 absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-white">
              <svg
                className="text-gray-90 h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <span className="text-gray-90 text-xs font-medium">폴더 추가</span>
        </button>
      </div>
    </div>
  );
}
