import { PageContentSectionProps } from '@/types/pages';
import LinkCard from '../common-ui/LinkCard';
import FolderCard from '../common-ui/FolderCard';
import AddLinkModal from '../modal/link/AddLinkModal';
import { useModalStore } from '@/stores/modalStore';

export default function SharedPageContentSection({
  folderData,
  linkData,
}: PageContentSectionProps) {
  const { isLinkModalOpen, closeLinkModal } = useModalStore();

  const pageData = [...folderData, ...linkData].sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  console.log('pageData', pageData);

  return (
    <div className={`h-screen w-full overflow-y-auto`}>
      <div
        className={`grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {pageData.map((item) =>
          'folderId' in item ? (
            <FolderCard
              key={item.folderId}
              isBookmark={item.isFavorite}
              item={item}
            />
          ) : (
            <LinkCard
              key={item.linkId}
              isBookmark={item.isFavorite}
              item={item}
            />
          )
        )}
      </div>
      {isLinkModalOpen && (
        <AddLinkModal isOpen={isLinkModalOpen} onClose={closeLinkModal} />
      )}
    </div>
  );
}
