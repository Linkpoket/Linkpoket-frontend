import InactiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkInactive.svg?react';
import ActiveBookmarkIcon from '@/assets/common-ui-assets/FolderBookmarkActive.svg?react';
import CardMenu from '@/assets/widget-ui-assets/CardMenu.svg?react';

export default function LinkCard({ isBookmark }: { isBookmark: boolean }) {
  // 임시적인 하드코딩이며 데이터 추가시 해당 데이터로 대체 바랍니다 props 혹은 내부 함수 또한 기존 LinkItem 참고하여 수정이 필요합니다다
  return (
    <div className="border-gray-10 flex h-[242px] w-[208px] flex-col gap-4 rounded-[16px] border p-[16px]">
      <div className="bg-gray-40 border-gray-19 flex h-[96px] items-center justify-center overflow-hidden rounded-lg">
        {/* 이미지 태그 대신 스크롤링 이미지로 대체 */}
        <img src="/" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-[15px] font-bold">Text</p>
          </div>
          <p className="text-[13px] font-[400] text-gray-50">25.06.27 · 폴더</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button className="cursor-pointer">
            {isBookmark ? <ActiveBookmarkIcon /> : <InactiveBookmarkIcon />}
          </button>
          <button className="cursor-pointer">
            <CardMenu />
          </button>
        </div>
      </div>
    </div>
  );
}
