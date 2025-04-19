import { useState } from 'react';
import FolderIcon from '@/widgets/assets/FolderIcon.svg?react';
import SiteIcon from '@/widgets/assets/SiteIcon.svg?react';
import { Button } from '@/shared/ui/button';
import { SearchBar } from '@/shared/ui/SearchBar';
import { ViewToggle } from '@/shared/ui/ViewToggle';
import PageSelectBox from '@/widgets/page-layout/PageSelectBox';
import { useOutletContext } from 'react-router-dom';

type ContextType = {
  showSidebar: boolean;
};

export default function PageLayout() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { showSidebar } = useOutletContext<ContextType>();

  const MAX_TITLE_LENGTH = 21;
  const MAX_DESCRIPTION_LENGTH = 200;

  return (
    <div className="flex flex-col gap-[40px]">
      {/* HEADER SECTION */}
      <div className="border-b-gray-30 flex flex-col gap-[8px] border-b px-[64px] py-[24px]">
        <div className="relative w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= MAX_TITLE_LENGTH) {
                setTitle(e.target.value);
              }
            }}
            placeholder="제목을 입력하세요"
            className="inline-block text-[24px] font-bold text-gray-100 outline-none"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
                setDescription(e.target.value);
              }
            }}
            placeholder="페이지에 대한 설명을 입력하세요. 디렉토리 소개글은 200자를 넘을 수 없습니다"
            className="text-gray-70 max-h-[98px] w-full resize-none overflow-y-auto text-[16px] font-[400] outline-none"
          />
        </div>
      </div>
      {/* CONTROLLER */}
      <div className="flex justify-between px-[64px]">
        <div className="flex h-[48px] gap-[12px]">
          <Button variant="ghost" size="md" className="flex gap-[6px]">
            <FolderIcon />
            폴더 추가
          </Button>
          <Button variant="ghost" size="md" className="flex gap-[6px]">
            <SiteIcon />
            사이트 추가
          </Button>
        </div>
        <div className="flex gap-[12px]">
          <SearchBar size="fixed" placeholder="폴더, 사이트 검색" />
          <PageSelectBox />
          <ViewToggle selectedView={view} onChange={setView} />
        </div>
      </div>
      <div>
        {showSidebar === true ? (
          <div className="px-[136px] text-3xl font-bold">
            Sidebar Open 레이아웃
          </div>
        ) : (
          <div className="px-[296px] text-3xl font-bold">
            Sidebar Closed 레이아웃
          </div>
        )}
      </div>
    </div>
  );
}
