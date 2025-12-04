import { LinkDetail } from './links';

// 공통 타입 및 상수

export interface BaseRequest {
  pageId: string;
  commandType: string;
}

// 내부 재사용 타입

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T;
}

// 요청 데이터 타입

export interface CreateFolderData {
  baseRequest: BaseRequest;
  folderName: string;
  parentFolderId: string;
}

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

export interface TransferFolderData {
  baseRequest: BaseRequest & { commandType: 'DIRECTORY_TRANSMISSION' };
  receiverEmail: string;
  folderId: string;
}

export interface UpdateDragandDropProps {
  baseRequest: BaseRequest;
  targetId: string;
  itemType: string;
  newOrderIndex: number;
  fromFolderId: string;
  toFolderId: string;
}

export interface FolderDetailsProps {
  pageId: string;
  commandType: string;
  folderId: string;
  sortType: string;
}

// 응답 데이터 타입

export interface FolderDetail {
  isFavorite: boolean;
  orderIndex?: number;
  createdDate: string;
  folderId: string;
  folderName: string;
}

export type FolderDetailResponse = Array<FolderDetail>;

interface FolderDetailsResponseContent {
  folderDetailResponses: FolderDetail[];
  linkDetailResponses: LinkDetail[];
  targetFolderId: string;
  targetFolderName: string;
  targetFolderDepth: number;
  folderCount: number;
  linkCount: number;
}

export type FolderDetailsResponse =
  ApiResponseStructure<FolderDetailsResponseContent>;

interface SidebarDirectoryItem {
  folderId: string;
  folderTitle: string;
  children: Array<{
    folderId: string;
    folderTitle: string;
  }>;
}

interface FolderListResponseContent {
  pageId: string;
  directories: SidebarDirectoryItem[];
}

export type FolderListResponse =
  ApiResponseStructure<FolderListResponseContent>;

interface TransferFolderResponseContent {
  receiverEmail: string;
  senderEmail: string;
  folderName: string;
  folderTransmissionId: string;
}

export type TransferFolderResponse =
  ApiResponseStructure<TransferFolderResponseContent>;
