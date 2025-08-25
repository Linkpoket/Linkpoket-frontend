import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmark.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmark.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';
import { FolderDetail } from '@/types/folders';
import DropDownInline from './DropDownInline';

export default function FolderCard({
  isBookmark,
  item,
}: {
  isBookmark: boolean;
  item: FolderDetail;
}) {
  const [isDropDownInline, setIsDropDownInline] = useState(false);
  const navigate = useNavigate();
  const { pageId } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const folderId = item.folderId?.toString();

  const { mutate: updateFolderBookmark } = useUpdateFolderBookmark({
    folderId: folderId,
    pageId: pageId as string,
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // 드롭다운이나 버튼 영역인지 확인
    const target = e.target as HTMLElement;
    const isDropdownArea = target.closest('[data-dropdown]');
    const isButtonArea = target.closest('[data-card-button]');
    const isModalArea = target.closest('[data-ignore-outside-click]');

    if (isDropdownArea || isButtonArea || isModalArea) return;

    // 카드 클릭 시 폴더로 이동
    setParentsFolderId(pageId as string);
    navigate(`/folder/${item.folderId}`);
  };

  const handleBookmarkClick = () => {
    updateFolderBookmark();
  };

  const handleMenuClick = () => {
    setIsDropDownInline((v) => !v);
  };

  return (
    <div
      className="bg-gray-0 border-gray-10 group relative flex h-[242px] min-w-[156px] flex-col gap-4 rounded-[16px] border p-[16px] hover:cursor-pointer"
      onClick={handleCardClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="bg-gray-10 flex h-[96px] w-full items-center justify-center overflow-hidden rounded-lg">
        <div className="h-full w-full rounded-lg bg-[url('@/assets/common-ui-assets/FolderImage.svg')] bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-110" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-[15px] font-bold">{item.folderName}</p>
          </div>
          <p className="text-[13px] font-[400] text-gray-50">
            {item.createdDate} · 폴더
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <button
            data-card-button
            className="cursor-pointer"
            onClick={handleBookmarkClick}
          >
            {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
          </button>

          <div className="relative">
            <button
              data-card-button
              className="cursor-pointer p-1"
              onClick={handleMenuClick}
            >
              <CardMenu />
            </button>

            {isDropDownInline && (
              <DropDownInline
                id={folderId}
                type="folder"
                initialTitle={item.folderName}
                isDropDownInline={isDropDownInline}
                setIsDropDownInline={setIsDropDownInline}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
