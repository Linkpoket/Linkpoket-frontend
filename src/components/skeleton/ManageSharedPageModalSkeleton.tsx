import { SkeletonBase } from './SkeletonBase';

export const ManageSharedPageModalSkeleton = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-[var(--color-text-white)] p-6 md:max-w-[562px]">
        {/* 헤더 스켈레톤 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="h-[24px] w-[150px] rounded">
            <SkeletonBase />
          </div>
          <div className="h-[24px] w-[24px] rounded">
            <SkeletonBase />
          </div>
        </div>

        {/* 페이지 공개 섹션 스켈레톤 */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="h-[24px] w-[100px] rounded">
              <SkeletonBase />
            </div>
            {/* Toggle 버튼 스켈레톤 */}
            <div className="h-[24px] w-[48px] rounded-full">
              <SkeletonBase />
            </div>
          </div>
          {/* 설명 텍스트 스켈레톤 */}
          <div className="mt-[7px] mb-4">
            <div className="h-[20px] w-[300px] rounded">
              <SkeletonBase />
            </div>
          </div>
        </div>

        {/* 링크 복사 섹션 스켈레톤 */}
        <div className="mt-4 flex gap-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <div className="h-[42px] w-full rounded">
                <SkeletonBase />
              </div>
            </div>
            <div className="h-[42px] w-[120px] rounded">
              <SkeletonBase />
            </div>
          </div>
        </div>

        {/* 멤버 섹션 스켈레톤 */}
        <div className="mt-6">
          {/* 멤버 섹션 헤더 */}
          <div className="mb-2">
            <div className="h-[24px] w-[150px] rounded">
              <SkeletonBase />
            </div>
          </div>

          {/* 검색 및 초대 버튼 */}
          <div className="mt-[7px] flex items-center gap-4">
            <div className="flex-1">
              <div className="h-[42px] w-full rounded">
                <SkeletonBase />
              </div>
            </div>
            <div className="h-[42px] w-[100px] rounded">
              <SkeletonBase />
            </div>
          </div>

          {/* 멤버 리스트 스켈레톤 */}

          <div className="mt-2 max-h-[220px] overflow-y-auto">
            {/* 3개의 멤버 아이템 스켈레톤 */}
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border-gray-10 flex items-center gap-3 border-b py-2 last:border-b-0"
              >
                {/* 프로필 이미지 스켈레톤 */}
                <div className="h-[32px] w-[32px] rounded-full">
                  <SkeletonBase />
                </div>
                {/* 멤버 정보 스켈레톤 */}
                <div className="flex-1 space-y-2">
                  <div className="h-[16px] w-[100px] rounded">
                    <SkeletonBase />
                  </div>
                  <div className="h-[14px] w-[150px] rounded">
                    <SkeletonBase />
                  </div>
                </div>
                {/* 액션 버튼 스켈레톤 */}
                <div className="h-[42px] w-[87px] rounded">
                  <SkeletonBase />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 이후 멤버 목록 api에 따라 해당 스켈레톤 ui 수정  -> 지금은 멤버 3명이라고 임의 가정정*/
