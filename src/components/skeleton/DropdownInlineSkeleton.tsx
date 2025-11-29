import { SkeletonBase } from './SkeletonBase';

export const DropDownInlineSkeleton = () => {
  return (
    <div
      className={`border-gray-20 bg-gray-0 absolute top-[130px] z-[1000] mt-2 inline-flex w-[140px] flex-col rounded-[10px] border p-[4px] text-[14px] font-[500] shadow sm:w-[214px] md:top-[160px] md:right-[-8px] xl:top-[160px]`}
    >
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
