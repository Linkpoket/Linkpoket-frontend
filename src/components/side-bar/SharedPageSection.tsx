import React from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';

interface SharedPageSectionProps {
  joinedPage: any[];
  isSharedPageActive: (pageId: string) => boolean;
  handleCreateSharedPage: () => void;
}

export const SharedPageSection: React.FC<SharedPageSectionProps> = ({
  joinedPage,
  isSharedPageActive,
  handleCreateSharedPage,
}) => {
  return (
    <>
      <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50">
        <div className="group flex w-full items-center justify-between">
          <div>공유 페이지</div>
          <PlusIcon
            className="text-gray-40 hover:text-gray-90 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleCreateSharedPage();
            }}
            aria-label="공유페이지 추가"
            height={18}
            width={18}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-[2px]">
        {joinedPage?.map((page: any) => (
          <Link
            key={page.pageId}
            to={`/shared/${page.pageId}`}
            className={`block rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
              isSharedPageActive(page.pageId)
                ? 'bg-gray-5 text-gray-90'
                : 'text-gray-70 hover:bg-gray-5'
            }`}
          >
            {page.pageTitle}
          </Link>
        ))}
      </div>
    </>
  );
};
