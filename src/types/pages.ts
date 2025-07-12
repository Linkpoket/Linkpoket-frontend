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
  pageId: string;
}

export interface PageDetails {
  pageId: string;
  pageTitle: string;
  pageDescription: string;
  rootFolderId: string;
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

export interface UpdatePageDescriptionData {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  pageDescription: string;
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
  permissionType: string;
}

export interface PatchSharedPageInvitationData {
  requestId: string;
  requestStatus: string;
  notificationType: string;
}
