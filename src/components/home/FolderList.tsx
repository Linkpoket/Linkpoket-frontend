import { useNavigate } from 'react-router-dom';
import { HomeCard } from '@/constants/homeCards';

interface FolderListProps {
  hoveredCard: HomeCard | null;
  isDataLoaded: boolean;
  getRandomColor: (index: number) => string;
}

export const FolderList = ({
  hoveredCard,
  isDataLoaded,
  getRandomColor,
}: FolderListProps) => {
  const navigate = useNavigate();

  if (!hoveredCard) return null;

  const handleFolderClick = (folder: {
    folderId: string;
    folderTitle: string;
  }) => {
    if (hoveredCard.isSharedPage && hoveredCard.pageId) {
      navigate(`/shared/${hoveredCard.pageId}/folder/${folder.folderId}`);
    } else if (hoveredCard.id === 'bookmark') {
      navigate(`/bookmarks/folder/${folder.folderId}`);
    } else {
      navigate(`/personal/folder/${folder.folderId}`);
    }
  };

  return (
    <div className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="max-w-4xl rounded-full bg-white/30 px-8 py-4 shadow-2xl backdrop-blur-md">
        {!isDataLoaded ? (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
              <span className="text-sm text-gray-500">폴더 로딩 중...</span>
            </div>
          </div>
        ) : hoveredCard.folders && hoveredCard.folders.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {hoveredCard.folders.map((folder, index) => (
              <div
                key={index}
                onClick={() => handleFolderClick(folder)}
                className="cursor-pointer rounded-full bg-white px-6 py-2 transition-colors duration-200 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: getRandomColor(index) }}
                  />
                  <span className="text-base font-medium text-black">
                    {folder.folderTitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500">폴더가 없습니다</span>
          </div>
        )}
      </div>
    </div>
  );
};
