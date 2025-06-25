import { FolderDetail } from './folders';
import { LinkDetail } from './links';

export interface CreateSharedPageData {
  pageTitle: string;
  pageDescription?: string;
  pageType: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface JoinedPageData {
  pageId: string;
  pageTitle: string;
  pageType: string;
}

export interface PageParamsData {
  pageId: number;
}

export interface PageDetails {
  pageId: number;
  pageTitle: string;
  pageDescription: string;
  rootFolderId: number;
  directoryDetailRespons: FolderDetail[];
  siteDetailResponses: LinkDetail[];
  fullPath: string;
}

export interface DeleteSharedPageData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
}

export interface UpdatePageTitleData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  pageTitle: string;
}

export interface UpdatePageDescriptionData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  pageDescription: string;
}

export interface UpdateSharedPageInvitationData {
  baseRequest: {
    pageId: number;
    commandType: 'SHARED_PAGE_INVITATION';
  };
  receiverEmail: string;
  permissionType: string;
}

export interface UpdateSharedPagePermissionData {
  baseRequest: {
    pageId: number;
    commandType: 'SHARED_PAGE_PERMISSION_CHANGE';
  };
  targetMemberId: number;
  permissionType: string;
}

export interface PatchSharedPageInvitationData {
  requestId: number;
  requestStatus: string;
  notificationType: string;
}
