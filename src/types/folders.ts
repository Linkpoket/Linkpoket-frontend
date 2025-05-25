export type CreateFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderName: string;
  parentFolderId: number;
  folderDescription: string;
};

export type DeleteFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderId: number;
};

export interface FetchFolderDetailsProps {
  pageId: number;
  commandType: string;
  folderId: number;
  sortType: string;
}
