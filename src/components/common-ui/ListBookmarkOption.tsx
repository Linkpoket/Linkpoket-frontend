import InactiveBookmarkIcon from '@/assets/common-ui-assets/InactiveBookmarkIcon.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmarkIcon.svg?react';
import Menu from '@/assets/widget-ui-assets/Menu.svg?react';
import { useState } from 'react';
import DropDownInline from '../common-ui/DropDownInline';
interface ListBookmarkOptionInterface {
  isBookmark: boolean;
  handleBookmark: (e: React.MouseEvent) => void;
  item: {
    id: string;
    title: string;
    linkUrl?: string;
  };
  itemId: string;
  initialTitle: string;
  initialLink?: string;
  type: string;
}

export default function ListBookMarkOption({
  isBookmark,
  itemId,
  initialTitle,
  initialLink,
  type,
  handleBookmark,
}: ListBookmarkOptionInterface) {
  const [isDropDownInline, setIsDropDownInline] = useState(false);

  const handleDropDownInline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropDownInline((prev) => !prev);
  };

  return (
    <div className="relative flex items-center">
      <button
        className="h-[38px] w-[38px] px-[10px] py-[10px]"
        onClick={handleBookmark}
      >
        {isBookmark === false ? (
          <InactiveBookmarkIcon className="cursor-pointer" />
        ) : (
          <ActiveBookmarkIcon className="relative left-[2px] cursor-pointer" />
        )}
      </button>
      <button
        className="active:bg-gray-10 h-[38px] w-[38px] cursor-pointer px-[10px] py-[10px] active:rounded-[8px]"
        onClick={handleDropDownInline}
      >
        <Menu width={20} height={20} />
      </button>
      {isDropDownInline && (
        <DropDownInline
          id={itemId}
          type={type}
          initialTitle={initialTitle}
          initialLink={initialLink ?? ''}
          className="absolute top-10 right-1 z-1"
          isDropDownInline={isDropDownInline}
          setIsDropDownInline={setIsDropDownInline}
        />
      )}
    </div>
  );
}
