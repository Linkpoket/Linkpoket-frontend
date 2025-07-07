import { PageContentSectionProps } from '@/types/pageItems';
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
          return null;
        })}
      </div>
    </div>
  );
}
