import { SkeletonBase } from './SkeletonBase';

export const DeleteFolderModalSkeleton = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-[var(--color-text-white)] p-4 md:max-w-[544px]">
        {/* 헤더 스켈레톤 */}
        <div className="flex flex-col">
          {/* 아이콘과 제목 영역 */}
          <div className="flex items-center space-x-[10px]">
            <div className="h-[24px] w-[24px] rounded">
              <SkeletonBase />
            </div>
            {/* "폴더 삭제 텍스트 스켈레톤 */}
            <div className="h-[24px] w-[80px] rounded">
              <SkeletonBase />
            </div>
          </div>

          {/* 설명 텍스트 스켈레톤 */}
          <div className="mt-2 mb-6 ml-9">
            <div className="h-[24px] w-[250px] rounded">
              <SkeletonBase />
            </div>
          </div>
        </div>

        {/* 푸터 스켈레톤 */}
        <div className="flex justify-end space-x-2 pt-0">
          {/* 취소 버튼 스켈레톤 */}
          <div className="h-[46px] w-[80px] rounded-lg">
            <SkeletonBase />
          </div>
          {/* 삭제 버튼 스켈레톤 */}
          <div className="h-[46px] w-[80px] rounded-lg">
            <SkeletonBase />
          </div>
        </div>
      </div>
    </div>
  );
};
