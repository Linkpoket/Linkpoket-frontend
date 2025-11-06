import React from 'react';
import { Link } from 'react-router-dom';
import { JoinedPageData } from '@/types/pages';

type SharedPageListProps = {
  pages: JoinedPageData[];
  isSharedPageActive: (pageId: number) => boolean;
};

const SharedPageList: React.FC<SharedPageListProps> = ({
  pages,
  isSharedPageActive,
}) => {
  return (
    <div className="mt-2 flex flex-col gap-[2px]">
      {pages?.map((page) => (
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
  );
};

export default SharedPageList;
