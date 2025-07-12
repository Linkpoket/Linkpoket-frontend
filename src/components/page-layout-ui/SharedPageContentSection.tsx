import { useState } from 'react';
import { PageContentSectionProps } from '@/types/pageItems';

export default function SharedPageContentSection({
  contentData,
}: PageContentSectionProps) {
  // const { openLinkModal, openFolderModal } = useModalStore();
  const [isBookmarkRerender, setIsBookmarkRerender] = useState(false);

  return (
    <div className={`w-full overflow-y-auto`}>
      <div
        className={`grid w-full grid-cols-2 justify-center gap-x-2 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`}
      >
        {/* FolderCard혹은 LinkCard렌더링 */}
      </div>
    </div>
  );
}
