import React from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '@/assets/common-ui-assets/PlusIcon.svg?react';
import { FolderToggleIcon } from './FolderToggleIcon';

interface FolderSectionProps {
  contextualFolderList: any[];
  expandedFolders: Set<string>;
  toggleFolder: (folderId: string) => void;
  getFolderLink: (folderId: string) => string;
  isFolderActive: (folderId: string) => boolean;
  handleCreateFolder: () => void;
}

export const FolderSection: React.FC<FolderSectionProps> = ({
  contextualFolderList,
  expandedFolders,
  toggleFolder,
  getFolderLink,
  isFolderActive,
  handleCreateFolder,
}) => {
  return (
    <>
      <div className="mt-4 flex items-center px-[8px] py-[4px] text-[14px] font-[500] text-gray-50">
        <div className="group flex w-full items-center justify-between">
          <div>폴더</div>
          <PlusIcon
            className="text-gray-40 hover:text-gray-90 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleCreateFolder();
            }}
            aria-label="폴더 추가"
            height={18}
            width={18}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-[2px]">
        {contextualFolderList?.map((folder: any) => (
          <div key={folder.folderId}>
            <div className="flex items-center">
              <Link
                to={getFolderLink(folder.folderId)}
                className={`flex w-full items-center justify-between rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                  isFolderActive(folder.folderId)
                    ? 'bg-primary-5 text-primary-50'
                    : 'text-gray-70 hover:bg-primary-5'
                }`}
              >
                {folder.folderTitle}
                {folder.children && folder.children.length > 0 ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFolder(folder.folderId);
                    }}
                    className="hover:text-gray-70 mr-1 flex h-4 w-4 cursor-pointer items-center justify-center text-gray-50"
                    aria-label={`${folder.folderTitle} 폴더 ${expandedFolders.has(folder.folderId) ? '접기' : '펼치기'}`}
                  >
                    <FolderToggleIcon
                      isCollapsed={!expandedFolders.has(folder.folderId)}
                      folderId={folder.folderId}
                      isFolderActive={isFolderActive}
                    />
                  </button>
                ) : (
                  <div className="mr-1 h-4 w-4" />
                )}
              </Link>
            </div>

            {/* 하위 폴더 */}
            {folder.children &&
              folder.children.length > 0 &&
              expandedFolders.has(folder.folderId) && (
                <div className="mt-1 ml-5 flex flex-col gap-[2px]">
                  {folder.children.map((child: any) => (
                    <Link
                      key={child.folderId}
                      to={getFolderLink(child.folderId)}
                      className={`block rounded-[8px] py-2 pr-3 pl-2 text-[14px] font-[600] ${
                        isFolderActive(child.folderId)
                          ? 'bg-primary-5 text-primary-50'
                          : 'text-gray-70 hover:bg-primary-5'
                      }`}
                    >
                      <span className="pr-2">•</span>
                      <span>{child.folderTitle}</span>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </>
  );
};
