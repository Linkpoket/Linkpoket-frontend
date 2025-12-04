import React from 'react';
import toast from 'react-hot-toast';
import Copy from '@/assets/common-ui-assets/Copy.svg?react';

export const CopyLinkButton: React.FC<{ isMobile: boolean }> = ({
  isMobile,
}) => {
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success('링크가 복사되었습니다.');
    } catch (error) {
      toast.error('링크 복사를 실패했습니다.');
    }
  };

  if (!isMobile) return null;

  return (
    <button
      onClick={handleCopyLink}
      className="hover:bg-gray-10 active:bg-gray-20 absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-colors"
      aria-label="링크 복사"
    >
      <Copy className="text-gray-90 h-5 w-5" />
    </button>
  );
};
