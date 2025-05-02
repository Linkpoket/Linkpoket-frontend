import { useEffect } from 'react';
import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';

type ContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
};

export function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <div
      className="border-gray-30 bg-gray-0 absolute z-50 flex w-[198px] flex-col overflow-hidden rounded-[10px] border p-2"
      style={{
        top: y,
        left: x,
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)',
      }}
    >
      <button className="text-gray-90 hover:bg-gray-10 flex w-full cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[600]">
        <FolderIcon width={18} height={18} /> 폴더 추가
      </button>
      <button className="text-gray-90 hover:bg-gray-10 flex w-full cursor-pointer items-center gap-[10px] rounded-lg px-2 py-[11px] text-[14px] font-[600]">
        <SiteIcon width={18} height={20} /> 링크 추가
      </button>
    </div>
  );
}
