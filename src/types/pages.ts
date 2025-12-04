import { FolderDetail } from './folders';
import { LinkDetail } from './links';

// 공통 타입 및 상수

export interface BaseRequest {
  pageId: string;
  commandType: string;
}

export interface PageParamsData {
  pageId: string;
}

// 내부 재사용 타입

interface PageBaseFields {
  pageId: string;
  pageTitle: string;
}

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T;
}

// 요청 데이터 타입 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
export interface CreateSharedPageData {
  pageType: 'SHARED';
}

export interface DeleteSharedPageData {
  baseRequest: BaseRequest;
}

export interface UpdatePageTitleData {
  baseRequest: BaseRequest;
  pageTitle: string;
}

export interface UpdateSharedPageInvitationData {
  baseRequest: BaseRequest & { commandType: 'SHARED_PAGE_INVITATION' };
  receiverEmail: string;
  permissionType: string;
}

export interface UpdateSharedPagePermissionData {
  baseRequest: BaseRequest & { commandType: 'SHARED_PAGE_PERMISSION_CHANGE' };
  targetMemberId: string;
  permissionType: string | null;
}

export interface PatchSharedPageInvitationData {
  dispatchRequestId: string;
  requestStatus: string;
  notificationType: string;
}

// 응답 데이터 타입 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//개인 페이지 데이터 타입
export interface PageDetails extends PageBaseFields {
  rootFolderId: string;
  directoryDetailRespons: FolderDetail[];
  siteDetailResponses: LinkDetail[];
  fullPath: string;
}

interface PageDataContent {
  pageId: string;
  pageTitle: string;
  rootFolderId: string;
  pageImageUrl: string;
  folderDetailResponses: FolderDetail[];
  linkDetailResponses: LinkDetail[];
  fullPath: string;
  pageVisibility: 'PUBLIC' | 'RESTRICTED';
}

export type PageData = ApiResponseStructure<PageDataContent>;

//들어와있는 페이지 데이터 타입
export interface JoinedPageData extends PageBaseFields {
  pageType: 'PERSONAL' | 'SHARED';
}

export interface JoinedPageFolder {
  folderId: string;
  folderName: string;
  orderIndex: number;
}

export interface JoinedPageItem {
  pageId: number;
  pageTitle: string;
  pageType: 'PERSONAL' | 'SHARED';
  pageImageUrl: string;
  folders: JoinedPageFolder[];
}

export type FetchJoinedPageResponseData = ApiResponseStructure<
  JoinedPageItem[]
>;

//초대 응답 데이터 타입
interface PatchSharedPageInvitationResponseContent {
  dispatchRequestId: string;
  requestStatus: 'ACCEPTED' | 'REJECTED';
  senderEmail: string;
  notificationType: string;
}

export type PatchSharedPageInvitationResponseData =
  ApiResponseStructure<PatchSharedPageInvitationResponseContent>;

//북마크 타입

interface BookmarkResponseContent {
  email: string;
  folderSimpleResponses: FolderDetail[];
  linkSimpleResponses: LinkDetail[];
}

export type BookmarkResponse = ApiResponseStructure<BookmarkResponseContent>;

// 컴포넌트 Props 타입

export interface PageControllerSectionProps {
  folderDataLength: number;
  linkDataLength: number;
  onSortChange: (sortType: string) => void;
}

export interface PageContentSectionProps {
  folderData: FolderDetail[];
  linkData: LinkDetail[];
  sortType: string;
}
