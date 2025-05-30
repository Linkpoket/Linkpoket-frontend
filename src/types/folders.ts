export type CreateFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderName: string;
  parentFolderId: number;
  folderDescription: string;
};

export type TransferFolderData = {
  baseRequest: {
    pageId: number;
    commandType: 'DIRECTORY_TRANSMISSION';
  };
  receiverEmail: string;
  directoryId: number;
};

export type TransferFolderResponse = {
  data: {
    receiverEmail: string;
    senderEmail: string;
    directoryName: string;
    directoryTransmissionId: number;
  };
};

export type FolderDetail = {
  folderId: number;
  folderName: string;
  isFavorite: boolean;
  orderIndex: number;
};

export type FolderDetailResponse = Array<FolderDetail>;

export type UpdateFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderName: string;
  folderId: number;
  folderDescription?: string;
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

