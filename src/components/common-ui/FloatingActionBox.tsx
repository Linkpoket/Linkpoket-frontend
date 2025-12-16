import { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/modalStore';
import { ActionButton } from '@/components/common-ui/ActionButton';
import FloatingLinkIcon from '@/assets/common-ui-assets/FloatingLinkIcon.svg?react';
import FloatingFileIcon from '@/assets/common-ui-assets/FloatingFileIcon.svg?react';
import FloatingFolderIcon from '@/assets/common-ui-assets/FloatingFolderIcon.svg?react';
import { useMobile } from '@/hooks/useMobile';

const FloatingActionBox = () => {
  const isMobile = useMobile();
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
      <div className="flex items-center justify-center gap-[50px] rounded-[26px] bg-white px-[50px] py-[31px] shadow-lg">
        <ActionButton
          icon={<FloatingLinkIcon className="text-gray-90 h-[31px] w-[37px]" />}
          label="링크 추가"
          onClick={handleAddLink}
          ariaLabel="링크 추가"
        />
        <ActionButton
          icon={<FloatingFileIcon className="text-gray-90 h-[31px] w-[37px]" />}
          label="파일 추가"
          onClick={handleAddFile}
          ariaLabel="파일 추가"
        />
        <ActionButton
          icon={
            <FloatingFolderIcon className="text-gray-90 h-[31px] w-[37px]" />
          }
          label="폴더 추가"
          onClick={handleAddFolder}
          ariaLabel="폴더 추가"
        />
      </div>
    </div>
  );
};

export default FloatingActionBox;
