import { useState, useEffect } from 'react';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';
import { useModalStore } from '@/stores/modalStore';
import { useBreadcrumbStore } from '@/stores/breadcrumb';
import { useProfileModalStore } from '@/stores/profileModalStore';
import ProfileSettingsModal from '../modal/profile/ProfileSettingsModal';

export default function PersonalPageContentSection({
  view,
  searchResult,
  pageDetails,
}: PageContentSectionProps) {
  const { openLinkModal, openFolderModal } = useModalStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { isProfileModalOpen, closeProfileModal } = useProfileModalStore();

  console.log('선택한 페이지 데이터:', pageDetails);

  const { resetBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    resetBreadcrumbs();
  }, [resetBreadcrumbs]);

  // 실제 사용할 데이터
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const folderData = pageDetails?.directoryDetailRespons ?? [];
  const linkData = pageDetails?.siteDetailResponses ?? [];

  const mergedList = searchResult
    ? [
        ...(searchResult.directorySimpleResponses ?? []),
        ...(searchResult.siteSimpleResponses ?? []),
      ].map((item, index) => ({
        ...item,
        orderIndex:
          'orderIndex' in item && typeof item.orderIndex === 'number'
            ? item.orderIndex
            : index,
      }))
    : [...folderData, ...linkData].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`mx-auto mt-[40px] w-full max-w-[1180px] flex-1 overflow-y-auto px-[104px] text-3xl font-bold`}
    >
      <div
        className={`w-full max-w-[1180px] min-w-[328px] ${
          view === 'grid'
            ? 'grid-cols-custom grid gap-4'
            : 'flex flex-col gap-4'
        }`}
      >
        {mergedList.map((item) => {
          if ('folderId' in item) {
            return (
              <FolderItem
                key={`folder-${item.folderId}`}
                isBookmark={item.isFavorite}
                item={{ id: Number(item.folderId), title: item.folderName }}
                view={view}
              />
            );
          } else if ('linkId' in item) {
            return (
              <LinkItem
                key={`link-${item.linkId}`}
                isBookmark={item.isFavorite}
                item={{
                  id: Number(item.linkId),
                  title: item.linkName,
                  linkUrl: item.linkUrl,
                }}
                view={view}
              />
            );
          }
          return null;
        })}

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onAddFolder={openFolderModal}
            onAddLink={openLinkModal}
          />
        )}

        {/* 프로필 세팅 모달 */}
        {isProfileModalOpen && (
          <ProfileSettingsModal
            isOpen={isProfileModalOpen}
            onClose={() => closeProfileModal()}
          />
        )}
      </div>
    </div>
  );
}
