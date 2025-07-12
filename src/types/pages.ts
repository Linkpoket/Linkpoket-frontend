import { FolderDetail } from './folders';
import { LinkDetail } from './links';

export interface CreateSharedPageData {
  pageType: 'SHARED';
}

export interface JoinedPageData {
  pageId: string;
  pageTitle: string;
  pageType: 'PERSONAL' | 'SHARED';
}

export interface PageParamsData {
  pageId: string;
}

export interface PageDetails {
  pageId: number;
  pageTitle: string;
  rootFolderId: number;
  directoryDetailRespons: FolderDetail[];
  siteDetailResponses: LinkDetail[];
  fullPath: string;
}

export interface DeleteSharedPageData {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
}

export interface UpdatePageTitleData {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  pageTitle: string;
}

export interface UpdateSharedPageInvitationData {
  baseRequest: {
    pageId: string;
    commandType: 'SHARED_PAGE_INVITATION';
  };
  receiverEmail: string;
  permissionType: string;
}

export interface UpdateSharedPagePermissionData {
  baseRequest: {
    pageId: string;
    commandType: 'SHARED_PAGE_PERMISSION_CHANGE';
  };
  targetMemberId: string;
  permissionType: string | null;
}

export interface PatchSharedPageInvitationData {
  requestId: string;
  requestStatus: string;
  notificationType: string;
}
