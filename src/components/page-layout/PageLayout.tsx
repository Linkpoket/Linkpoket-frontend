import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';
import { Button } from '@/components/common-ui/button';
import { SearchBar } from '@/components/common-ui/SearchBar';
import { ViewToggle } from '@/components/common-ui/ViewToggle';
import PageSortBox from './PageSortBox';
import LinkItem from './LinkItem';
import FolderItem from './FolderItem';

type ContextType = {
  showSidebar: boolean;
};

export default function PageLayout() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isBookmark, setIsBookmark] = useState(false);
  const [isDropDownInline, setIsDropDownInline] = useState(false);
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
            링크 추가
          </Button>
        </div>
        <div className="flex gap-[12px]">
          <SearchBar size="fixed" placeholder="폴더, 링크 검색" />
          <PageSortBox />
          <ViewToggle selectedView={view} onChange={setView} />
        </div>
      </div>

      {/* Folder, Link */}
      <div
        className={`text-3xl font-bold ${
          showSidebar ? 'px-[140px]' : 'px-[142px]'
        }`}
      >
        <div
          className={
            view === 'grid'
              ? 'grid [grid-template-columns:repeat(auto-fit,minmax(134px,max-content))] gap-4'
              : 'flex max-w-[1374px] min-w-[422px] flex-col'
          }
        >
          <FolderItem
            isBookmark={isBookmark}
            setIsBookmark={setIsBookmark}
            item={{ id: '1', title: '폴더 이름' }}
            view={view}
          />
          <LinkItem
            isBookmark={isBookmark}
            setIsBookmark={setIsBookmark}
            item={{ id: '1', title: '링크 이름' }}
            view={view}
          />
        </div>
      </div>
    </div>
  );
}
