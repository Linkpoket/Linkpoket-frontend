import { SkeletonBase } from './SkeletonBase';

export const AddLinkModalSkeleton = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative flex w-full max-w-[70%] flex-col overflow-hidden rounded-2xl bg-[var(--color-text-white)] p-[24px] md:max-w-[530px]">
        {/* 헤더 스켈레톤 */}
        <div className="flex items-center justify-between">
          <div className="h-[24px] w-[100px] rounded">
            <SkeletonBase />
          </div>
          <div className="h-[24px] w-[24px] rounded">
            <SkeletonBase />
          </div>
        </div>

        {/* 바디 스켈레톤 */}
        <div className="flex-1 py-6">
          <div className="space-y-4">
            {/* URL 입력 필드 스켈레톤 */}
            <div className="space-y-2">
              <div className="h-[20px] w-[40px] rounded">
                <SkeletonBase />
              </div>
              <div className="h-[42px] w-full rounded">
                <SkeletonBase />
              </div>
            </div>

            {/* 링크명 입력 필드 스켈레톤 */}
            <div className="space-y-2">
              <div className="h-[20px] w-[50px] rounded">
                <SkeletonBase />
              </div>
              <div className="h-[42px] w-full rounded">
                <SkeletonBase />
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 스켈레톤 */}
        <div className="flex justify-end space-x-2 pt-4">
          <div className="h-[46px] w-[80px] rounded-lg">
            <SkeletonBase />
          </div>
          <div className="h-[46px] w-[80px] rounded-lg">
            <SkeletonBase />
          </div>
        </div>
      </div>
    </div>
  );
};
