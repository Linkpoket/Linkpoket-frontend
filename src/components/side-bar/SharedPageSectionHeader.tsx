import React from 'react';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';

type SharedPageSectionHeaderProps = {
  onCreateClick: (e: React.MouseEvent) => void;
};

const SharedPageSectionHeader: React.FC<SharedPageSectionHeaderProps> = ({
  onCreateClick,
}) => {
  return (
    <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50 hover:rounded-[8px] active:rounded-[8px]">
      <div className="group flex w-full items-center justify-between">
        <div className="flex gap-[20px]">
          <div>공유 페이지</div>
        </div>
        <PlusIcon
          className="text-gray-40 hover:text-gray-90 cursor-pointer"
          onClick={onCreateClick}
          aria-label="공유페이지 추가"
          height={18}
          width={18}
        />
      </div>
    </div>
  );
};

export default SharedPageSectionHeader;
