import { PageControllerSectionProps } from '@/types/pages';
import DropDownView from '../common-ui/DropDownView';

export default function PageControllerSection({
  folderDataLength = 0,
  linkDataLength = 0,
}: PageControllerSectionProps) {
  return (
    <div className="mb-2 flex h-[42px] items-center justify-between">
      {/* TODO: 하드코딩된 부분 데이터로 처리 */}
      <div className="text-[14px] font-[500] text-gray-50">
        {folderDataLength}개의 폴더 | {linkDataLength}개의 링크
      </div>
      <DropDownView />
    </div>
  );
}
