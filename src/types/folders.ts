export type CreateFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderName: string;
  parentFolderId: number;
  folderDescription: string;
};
