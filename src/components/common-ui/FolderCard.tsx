import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import useUpdateFolderBookmark from '@/hooks/mutations/useUpdateFolderBookmark';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
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

  const handleDoubleClick = () => {
    navigate(`/folder/${item.folderId}`);
    setParentsFolderId(pageId as string);
  };

  const handleBookmarkClick = () => {
    updateFolderBookmark();
    console.log('isBookmark', isBookmark);
  };

  return (
    <div>
      <div
        className="border-gray-10 flex h-[242px] min-w-[156px] flex-col gap-4 rounded-[16px] border p-[16px]"
        onDoubleClick={handleDoubleClick}
      >
        <div className="border-gray-10 flex h-[96px] items-center justify-center overflow-hidden rounded-lg bg-[url('@/assets/common-ui-assets/FolderImage.svg')] bg-cover bg-center bg-no-repeat"></div>

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
            <button className="cursor-pointer" onClick={handleBookmarkClick}>
              {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
            </button>
            <button
              className="cursor-pointer p-1"
              onClick={() => setIsDropDownInline(true)}
            >
              <CardMenu />
            </button>
          </div>
        </div>
      </div>
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
  );
}
