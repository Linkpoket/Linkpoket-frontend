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
      <div className="border-b-gray-30 flex flex-col gap-[16px] border-b px-[70px] py-[32px]">
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
            className="inline-block text-[32px] font-bold text-gray-100 outline-none"
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
            placeholder="페이지에 대한 설명을 입력하세요"
            className="text-gray-70 h-[116px] w-full resize-none overflow-y-scroll text-[19px] font-[400] outline-none"
          />
        </div>
      </div>
      {/* CONTROLLER */}
      <div className="flex justify-between px-[64px]">
        <div className="flex gap-[20px]">
          <Button variant="ghost" size="lg" className="flex gap-[10px]">
            <FolderIcon />
            폴더 추가
          </Button>
          <Button variant="ghost" size="lg" className="flex gap-[10px]">
            <SiteIcon />
            사이트 추가
          </Button>
        </div>
        <div className="flex gap-[20px]">
          <SearchBar size="fixed" />
          <PageSelectBox />
          <ViewToggle selectedView={view} onChange={setView} />;
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
