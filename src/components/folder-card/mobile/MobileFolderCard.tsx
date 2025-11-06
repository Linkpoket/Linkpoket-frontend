import { COLOR_OPTIONS } from '@/styles/tokens';
import { FolderDetail } from '@/types/folders';
import { useLocation, useNavigate } from 'react-router-dom';

function getRandomColor(index: number) {
  const colors = COLOR_OPTIONS;
  return colors[index % colors.length];
}

export default function MobileFolderCard({
  folder,
  folderDataLength,
  index,
}: {
  folder: FolderDetail;
  folderDataLength: number;
  index: number;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div
      key={folder.folderId}
      onClick={() => {
        const currentPath = window.location.pathname;
        let folderLink = '';
        if (currentPath.startsWith('/shared/')) {
          const pathParts = currentPath.split('/');
          const sharedPageId = pathParts[2];
          folderLink = `/shared/${sharedPageId}/folder/${folder.folderId}`;
        } else if (currentPath.startsWith('/bookmarks')) {
          folderLink = `/bookmarks/folder/${folder.folderId}`;
        } else {
          folderLink = `/personal/folder/${folder.folderId}`;
        }
        navigate(folderLink);
      }}
      className={`flex-shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-md focus:scale-105 focus:bg-gray-50 focus:shadow-md focus:outline-none active:scale-95`}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: getRandomColor(index) }}
        />
        <span className="text-sm font-medium text-black">
          {folder.folderName}
        </span>
      </div>
    </div>
  );
}
