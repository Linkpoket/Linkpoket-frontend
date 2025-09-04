import { SkeletonBase } from './SkeletonBase';

export const DropDownInlineSkeleton = () => {
  return (
    <div className="absolute top-[15px] right-[-6px] z-[1000] mt-2 inline-flex w-[214px] flex-col rounded-[10px] border border-[var(--color-inactive)] bg-[var(--color-text-white)] p-[4px] shadow">
      <div className="flex flex-col">
        {/* 입력 필드 스켈레톤 */}
        <div className="mb-2 h-[42px] rounded-lg">
          <SkeletonBase />
        </div>

        {/* 버튼들 스켈레톤 */}
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="mb-2 flex h-[40px] items-center gap-[10px] px-[8px]"
          >
            {/* 아이콘 스켈레톤 */}
            <div className="h-[18px] w-[18px] rounded">
              <SkeletonBase />
            </div>
            {/* 텍스트 스켈레톤 */}
            <div className="h-[18px] flex-1 rounded">
              <SkeletonBase />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
