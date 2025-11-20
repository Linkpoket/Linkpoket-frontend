export interface BaseRequest {
  pageId: string;
  commandType: string;
}

interface FolderBaseFields {
  folderId: string;
  folderName: string;
}

export interface CreateFolderData {
  baseRequest: BaseRequest;
  folderName: string;
  parentFolderId: string;
}

export interface TransferFolderData {
  baseRequest: BaseRequest & { commandType: 'DIRECTORY_TRANSMISSION' };
  receiverEmail: string;
  folderId: string;
}

export interface TransferFolderResponse {
  data: {
    receiverEmail: string;
    senderEmail: string;
    folderName: string;
    folderTransmissionId: string;
  };
}

export interface FolderDetail extends FolderBaseFields {
  isFavorite: boolean;
  orderIndex: number;
  createdDate: string;
}

export type FolderDetailResponse = Array<FolderDetail>;

export interface UpdateFolderData {
  baseRequest: BaseRequest;
  folderId: string;
  folderName: string;
  folderDescription?: string;
}

export interface DeleteFolderData {
  baseRequest: BaseRequest;
  folderId: string;
}

export interface FetchFolderDetailsProps {
  pageId: string;
  commandType: string;
  folderId: string;
  sortType: string;
}

export interface UpdateDragandDropProps {
  baseRequest: BaseRequest;
  targetId: string;
  itemType: string;
  newOrderIndex: number;
  fromFolderId: string;
  toFolderId: string;
}

export interface UpdateDragandDropMoveProps {
  baseRequest: BaseRequest;
  targetId: string;
  itemType: string;
  fromFolderId: string;
  toFolderId: string;
  currentOrderIndex: number;
}
