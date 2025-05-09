import { useState } from 'react';
import FolderIcon from '@/assets/widget-ui-assets/FolderIcon.svg?react';
import SiteIcon from '@/assets/widget-ui-assets/SiteIcon.svg?react';
import { Button } from '@/components/common-ui/button';
import { SearchBar } from '@/components/common-ui/SearchBar';
import { ViewToggle } from '@/components/common-ui/ViewToggle';
import PageSortBox from './PageSortBox';
import { PageControllerSectionProps } from '@/types/pageItems';
import FolderTransferModal from '../modal/folder/FolderTransferModal';
import AddFolderModal from '../modal/folder/AddFolderModal';
import DeleteFolderModal from '../modal/folder/DeleteFolderModal';
import ErrorModal from '../modal/folder/ErrorModal';
import AddLinkModal from '../modal/link/AddLinkModal';
import DeleteLinkModal from '../modal/link/DeleteLinkModal';

export default function PageControllerSection({
  view,
  setView,
}: PageControllerSectionProps) {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLinkModalOpen, setIsDeleteLinkModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  // 폴더 전송 버튼 클릭 핸들러
  const handleTransferFolder = () => {
    setIsTransferModalOpen(true);
  };

  // 링크 추가 버튼 클릭 핸들러
  const handleAddLink = () => {
    setIsAddLinkModalOpen(true);
  };

  // 폴더 추가 버튼 클릭 핸들러
  const handleAddFolder = () => {
    setIsAddModalOpen(true);
  };

  // 폴더 삭제 버튼 클릭 핸들러
  const handleDeleteFolder = () => {
    setIsDeleteModalOpen(true);
  };

  // 링크 삭제 버튼 클릭 핸들러
  const handleDeleteLinkFolder = () => {
    setIsDeleteModalOpen(true);
  };

  // 에러 버튼 클릭 핸들러
  const handleErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  // 이메일 전송 처리 함수
  const handleEmailSubmit = async (email: string) => {
    console.log(`폴더를 ${email}로 전송합니다.`);
    return Promise.resolve();
  };

  // 이메일 전송 처리 함수
  const handleLinkSubmit = async (link: string, url: string) => {
    console.log(`링크: ${link}, url:${url}`);
    return Promise.resolve();
  };

  // 폴더 전송 처리 함수
  const handleFolderSubmit = async (
    folderName: string,
    description: string
  ) => {
    console.log(`새 폴더 추가: ${folderName}, 설명 ${description}`);
    return Promise.resolve();
  };

  // 폴더 삭제 처리 함수
  const handleDeleteSubmit = async () => {
    if (selectedFolderId) {
      console.log(`폴더 ID: ${selectedFolderId} 삭제`);
      // 실제 API 호출 추가
    }
    return Promise.resolve();
  };

  // 폴더 삭제 처리 함수
  const handleDeleteLinkSubmit = async () => {
    if (selectedLinkId) {
      console.log(`폴더 ID: ${selectedLinkId} 삭제`);
      // 실제 API 호출 추가
    }
    return Promise.resolve();
  };

  return (
    <div className="flex flex-col justify-between gap-[16px] px-[64px] xl:flex-row xl:gap-0">
      <div className="flex h-[48px] gap-[12px]">
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={handleAddFolder}
          // 폴더 전송, 폴더 추가 모달 둘 다 폴더 추가 버튼 클릭 시 열린다고 해서 일단은 만들어두기만 했습니다.
        >
          <FolderIcon />
          폴더 추가
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={handleAddLink}
        >
          <SiteIcon />
          링크 추가
        </Button>

        {/* 임시 폴더 전송 */}
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={handleTransferFolder}
        >
          <SiteIcon />
          폴더 전송
        </Button>

        {/* 임시 폴더 삭제 */}
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={handleDeleteFolder}
        >
          <SiteIcon />
          폴더 삭제
        </Button>

        {/* 에러 모달 확인 버튼*/}
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={handleErrorModal}
        >
          <SiteIcon />
          에러 모달 확인 버튼
        </Button>

        {/* 링크 삭제 모달 확인 버튼*/}
        <Button
          variant="ghost"
          size="md"
          className="flex gap-[6px]"
          onClick={handleDeleteLinkFolder}
        >
          <SiteIcon />
          링크 삭제
        </Button>
      </div>

      <div className="flex gap-[12px]">
        <SearchBar size="fixed" placeholder="폴더, 링크 검색" />
        <PageSortBox />
        <div className="hidden lg:block">
          <ViewToggle selectedView={view} onChange={setView} />
        </div>
      </div>

      {/* 폴더 전송 모달 */}
      <FolderTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        folderName="새 폴더"
        onSubmit={handleEmailSubmit}
      />

      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        linkName="새 폴더"
        onSubmit={handleLinkSubmit}
      />

      {/* 폴더 추가 모달 */}
      <AddFolderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        folderName="새 폴더"
        onSubmit={handleFolderSubmit}
      />

      {/* 폴더 삭제 모달 */}
      <DeleteFolderModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        folderId={selectedFolderId}
        onSubmit={handleDeleteSubmit}
      />

      {/* 링크 삭제 모달 */}
      <DeleteLinkModal
        isOpen={isDeleteLinkModalOpen}
        onClose={() => setIsDeleteLinkModalOpen}
        linkId={selectedLinkId}
        onSubmit={handleDeleteLinkSubmit}
      />

      {/* 에러 모달 */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
}
