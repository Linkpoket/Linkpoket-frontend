export type CreateFolderData = {
  baseRequest: {
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
  folderId: string;
};

export type TransferFolderResponse = {
  data: {
    receiverEmail: string;
    senderEmail: string;
    folderName: string;
    folderTransmissionId: string;
  };
};

export type FolderDetail = {
  folderId: string;
  folderName: string;
  isFavorite: boolean;
  orderIndex: number;
  createdDate: string;
};

export type FolderDetailResponse = Array<FolderDetail>;

export type UpdateFolderData = {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  folderName: string;
  folderId: string;
  folderDescription?: string;
};

export type DeleteFolderData = {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  folderId: string;
};

export interface FetchFolderDetailsProps {
  pageId: string;
  commandType: string;
  folderId: string;
  sortType: string;
}

export interface UpdateDragandDropProps {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  targetId: string;
  itemType: string;
  newOrderIndex: number;
  fromFolderId: string;
  toFolderId: string;
}
