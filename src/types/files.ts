export type StorageProvider = 'GOOGLE_DRIVE' | 'LOCAL';

export interface FileResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  storageProvider: StorageProvider;
  nickname: string;
  createdDate: string;
  orderIndex: number;
}

export interface FileListByPageRequest {
  pageId: string;
  commandType: 'VIEW';
  sortType?: 'BASIC' | 'NAME' | 'DATE';
}

export interface FileListByFolderRequest {
  pageId: string;
  folderId: string;
  commandType: 'VIEW';
  sortType?: 'BASIC' | 'NAME' | 'DATE';
}

export type BaseRequest = {
  pageId: string;
  commandType: 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';
};

type WithBaseRequest<T> = T & {
  baseRequest: BaseRequest;
};

export type DeleteFileData = WithBaseRequest<{
  fileId: string;
}>;

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T;
}

export interface FileDeleteResponse {
  fileId: string;
  totalFileSizeGB: number;
}

export type DeleteFileResponse = ApiResponseStructure<FileDeleteResponse>;
