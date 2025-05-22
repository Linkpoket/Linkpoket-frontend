export type CreateFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  directoryName: string;
  parentFolderId: number;
  folderDescription: string;
};
