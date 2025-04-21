import { PageItemProps } from '@/types/pageItems';
import ListBookmarkOption from './ListBookmarkOption';
import InactiveBookmarkIcon from '@/assets/common-ui-assets/LinkBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/ActiveBookmarkIcon.svg?react';

export default function LinkItem({
  item,
  view,
  isBookmark,
  setIsBookmark,
}: PageItemProps) {
  const isGrid = view === 'grid';

  return isGrid ? (
    <div className="bg-gray-5 relative inline-flex flex-col items-center gap-2 rounded-[8px] p-[12px]">
      <div className="bg-primary-40 text-gray-0 flex h-[98px] w-[110px] items-center justify-center rounded-[8px] text-center">
        링
      </div>
      <button
        className="absolute top-6 right-5 cursor-pointer bg-transparent"
        onClick={() => setIsBookmark((prev) => !prev)}
      >
        {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
      </button>
      <span className="text-gray-90 text-center text-[15px] font-[400]">
        {item.title}
      </span>
    </div>
  ) : (
    <div className="border-gray-30 border-b-gray-30 active:bg-gray-5 hover:bg-gray-5 flex w-full items-center justify-between border-b py-[16px] pl-[8px] last:border-b-0">
      <div className="flex items-center gap-[24px]">
        <div className="h-[38px] w-[38px] text-center">링</div>
        <span className="text-gray-90 text-[16px] font-[400]">
          {item.title}
        </span>
      </div>
      <div>
        <ListBookmarkOption
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
        />
      </div>
    </div>
  );
}

//Link 텍스트를 감싸고있는 div는 추후 파비콘으로 교체 예정

// id,타입,폴더명,링크등을 ListBookmarkModal에 props로 전달함.
