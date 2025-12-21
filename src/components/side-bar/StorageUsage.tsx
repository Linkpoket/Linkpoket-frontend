import useUserInfo from '@/hooks/queries/useUserInfo';
import { useFolderColorStore } from '@/stores/folderColorStore';

export default function StorageUsage() {
  const { data: userInfoResponse } = useUserInfo();
  const { getCurrentColor } = useFolderColorStore();
  const currentFolderColor = getCurrentColor();

  const totalFileSizeGB = userInfoResponse?.data?.totalFileSizeGB ?? 0;
  const memberGrade = (userInfoResponse?.data as any)?.memberGrade || 'BASIC';

  // 등급별 최대 저장 용량 (GB)
  const getMaxStorageGB = (grade: string): number => {
    return grade === 'PRO' ? 75 : 10; // Basic: 10GB, Pro: 75GB
  };

  const maxStorageGB = getMaxStorageGB(memberGrade);

  // GB를 MB로 변환하여 표시
  const formatStorageText = (usedGB: number): string => {
    const usedMB = usedGB * 1024; // GB to MB

    // MB가 1 이상이면 MB로, 아니면 GB로 표시
    if (usedMB >= 1) {
      return `${Math.round(usedMB)}MB 사용`;
    } else {
      return `${usedGB.toFixed(2)}GB 사용`;
    }
  };

  // 진행률 계산 (0-100%)
  const progressPercentage = Math.min(
    (totalFileSizeGB / maxStorageGB) * 100,
    100
  );

  return (
    <div
      className="border-gray-10 mb-15 flex-shrink-0 border-t bg-white p-4"
      data-testid="storage-usage"
    >
      <div className="flex flex-col gap-2">
        {/* 진행 바 */}
        <div className="bg-gray-10 relative h-1 w-full overflow-hidden rounded-full">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: currentFolderColor.previewColor,
            }}
          />
        </div>

        {/* 사용 용량 텍스트 */}
        <div className="text-gray-60 text-[12px]">
          {maxStorageGB}GB 중 {formatStorageText(totalFileSizeGB)}
        </div>
      </div>
    </div>
  );
}
