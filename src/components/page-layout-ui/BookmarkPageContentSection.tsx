import { PageContentSectionProps } from '@/types/pageItems';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
export default function BookmarkPageContentSection({
  view,
  contentData,
}: PageContentSectionProps) {
  const folderData = contentData?.directorySimpleResponses ?? [];
  const linkData = contentData?.siteSimpleResponses ?? [];
  const mergedList = [...folderData, ...linkData];

  return (
    <div
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
                key={item.folderName}
                isBookmark={item.isFavorite}
                item={{ id: item.folderId, title: item.folderName }}
                view={view}
              />
            );
          } else if ('linkId' in item) {
            return (
              <LinkItem
                key={item.linkName}
                isBookmark={item.isFavorite}
                item={{
                  id: item.linkId,
                  title: item.linkName,
                  linkUrl: item.linkUrl,
                }}
                view={view}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
