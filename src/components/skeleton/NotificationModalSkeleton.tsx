import { SkeletonBase } from './SkeletonBase';

export const NotificationModalSkeleton = () => {
  return (
    <div className="absolute top-14 right-16 z-20">
      <div
        className="border-gray-30 bg-gray-0 max-h-[590px] w-[434px] rounded-2xl border p-[24px] pt-[8px]"
        style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)' }}
      >
        {/* 탭 스켈레톤 */}
        <div className="border-gray-30 mb-1 flex gap-1 border-b">
          {['전체', '페이지 초대', '받은 폴더'].map((_, index) => (
            <div key={index} className="px-4 py-[14px]">
              <div className="h-[18px] w-[60px] rounded">
                <SkeletonBase />
              </div>
            </div>
          ))}
        </div>

        {/* 알림 리스트 스켈레톤 */}
        <div>
          <ul>
            {/* 3개의 알림 아이템 스켈레톤 */}
            {[1, 2, 3].map((index) => (
              <li
                key={index}
                className={`py-4 ${index !== 3 ? 'border-b-gray-30 border-b' : ''}`}
              >
                <div className="flex items-start gap-[10px]">
                  {/* 프로필 이미지 스켈레톤 */}
                  <div className="h-[34px] w-[34px] rounded-full">
                    <SkeletonBase />
                  </div>

                  {/* 텍스트 영역 스켈레톤 */}
                  <div className="flex-1">
                    {/* 메시지 스켈레톤 */}
                    <div className="mb-2">
                      <div className="h-[16px] w-[250px] rounded">
                        <SkeletonBase />
                      </div>
                    </div>
                    {/* 시간 스켈레톤 */}
                    <div className="h-[14px] w-[120px] rounded">
                      <SkeletonBase />
                    </div>
                  </div>

                  {/* 삭제 버튼 스켈레톤 */}
                  <div className="h-[14px] w-[14px] rounded">
                    <SkeletonBase />
                  </div>
                </div>

                {/* 수락/거절 버튼 스켈레톤 */}
                <div className="mt-2 flex justify-end gap-2">
                  {/* 거절 버튼 스켈레톤 */}
                  <div className="h-[33px] w-[60px] rounded-[6px]">
                    <SkeletonBase />
                  </div>
                  {/* 수락 버튼 스켈레톤 */}
                  <div className="h-[33px] w-[60px] rounded-[6px]">
                    <SkeletonBase />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

//알람 수에 맞추어 스켈레톤 ui 수정 필요 -> 지금은 3개로 임의 지정
