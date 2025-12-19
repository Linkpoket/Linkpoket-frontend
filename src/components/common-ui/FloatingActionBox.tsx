import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { ActionButton } from '@/components/common-ui/ActionButton';
import FloatingLinkIcon from '@/assets/common-ui-assets/FloatingLinkIcon.svg?react';
import FloatingFileIcon from '@/assets/common-ui-assets/FloatingFileIcon.svg?react';
import FloatingFolderIcon from '@/assets/common-ui-assets/FloatingFolderIcon.svg?react';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';
import { useMobile } from '@/hooks/useMobile';

const FloatingActionBox = () => {
  const isMobile = useMobile();
  const { openLinkModal, openFileModal, openFolderModal } = useModalStore();
  const [left, setLeft] = useState('50%');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const main = document.getElementById('app-scroll-container');
      if (main) {
        const rect = main.getBoundingClientRect();
        setLeft(`${rect.left + rect.width / 2}px`);
      }
    };

    updatePosition();

    const main = document.getElementById('app-scroll-container');
    let resizeObserver: ResizeObserver | null = null;

    if (main) {
      resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(main);

      const parent = main.parentElement;
      if (parent) {
        resizeObserver.observe(parent);
      }
    }

    window.addEventListener('resize', updatePosition);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('floating-action-box-collapsed');
    if (stored === 'true') setIsCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('floating-action-box-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  const handleAddLink = () => {
    openLinkModal();
  };

  const handleAddFile = () => {
    openFileModal();
  };

  const handleAddFolder = () => {
    openFolderModal();
  };

  // 모바일에서는 표시하지 않음
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-16 z-[9998] -translate-x-1/2" style={{ left }}>
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          aria-label="플로팅 메뉴 펼치기"
          className="hover:bg-gray-5 active:bg-gray-10 flex h-[62px] w-[74px] items-center justify-center rounded-[20px] bg-white/60 shadow-lg transition-colors"
        >
          <PlusIcon className="text-gray-90 h-[18px] w-[18px]" />
        </button>
      ) : (
        <div className="relative flex items-center justify-center gap-[47px] rounded-[24px] bg-white/60 px-[47px] py-[29px] shadow-lg">
          {/* 접기 버튼 (우측 상단) */}
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            aria-label="플로팅 메뉴 접기"
            className="bg-gray-10 text-gray-90 hover:bg-gray-20 active:bg-gray-30 absolute top-[10px] right-[10px] flex h-7 w-7 items-center justify-center rounded-full transition-colors"
          >
            <span className="text-[18px] leading-none">−</span>
          </button>

          <ActionButton
            icon={
              <FloatingLinkIcon className="text-gray-90 h-[29px] w-[34px]" />
            }
            label="링크 추가"
            onClick={handleAddLink}
            ariaLabel="링크 추가"
          />
          <ActionButton
            icon={
              <FloatingFileIcon className="text-gray-90 h-[29px] w-[34px]" />
            }
            label="파일 추가"
            onClick={handleAddFile}
            ariaLabel="파일 추가"
          />
          <ActionButton
            icon={
              <FloatingFolderIcon className="text-gray-90 h-[29px] w-[34px]" />
            }
            label="폴더 추가"
            onClick={handleAddFolder}
            ariaLabel="폴더 추가"
          />
        </div>
      )}
    </div>
  );
};

export default FloatingActionBox;
