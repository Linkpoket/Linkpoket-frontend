export type CreateFolderData = {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: string;
  };
  folderName: string;
  parentFolderId: string;
};

export type TransferFolderData = {
  baseRequest: {
    pageId: string;
    commandType: 'DIRECTORY_TRANSMISSION';
  };
  receiverEmail: string;
  directoryId: string;
};

export type TransferFolderResponse = {
  data: {
    receiverEmail: string;
    senderEmail: string;
    directoryName: string;
    directoryTransmissionId: string;
  };
};

export type FolderDetail = {
  folderId: string;
  folderName: string;
  isFavorite: boolean;
  createdDate: string;
  orderIndex: number;
  createdDate: string;
};

export type FolderDetailResponse = Array<FolderDetail>;

export type UpdateFolderData = {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: string;
  };
  folderName: string;
  folderId: string;
  folderId: string;
  folderDescription?: string;
};

export type DeleteFolderData = {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: string;
  };
  folderId: string;
  folderId: string;
};

export interface FetchFolderDetailsProps {
  pageId: string;
  pageId: string;
  commandType: string;
  folderId: string;
  folderId: string;
  sortType: string;
}
