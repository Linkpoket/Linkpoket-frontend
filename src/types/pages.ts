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
  pageId: string;
}

export interface PageDetails {
  pageId: string;
  pageTitle: string;
  rootFolderId: number;
  directoryDetailRespons: FolderDetail[];
  siteDetailResponses: LinkDetail[];
  fullPath: string;
}

export interface DeleteSharedPageData {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: string;
  };
}

export interface UpdatePageTitleData {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: string;
  };
  pageTitle: string;
}

export interface PageControllerSectionProps {
  folderDataLength: number;
  linkDataLength: number;
}

export interface PageContentSectionProps {
  folderData: FolderDetail[];
  linkData: LinkDetail[];
}

export interface UpdateSharedPageInvitationData {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: 'SHARED_PAGE_INVITATION';
  };
  receiverEmail: string;
  permissionType: string;
}

export interface UpdateSharedPagePermissionData {
  baseRequest: {
    pageId: string;
    pageId: string;
    commandType: 'SHARED_PAGE_PERMISSION_CHANGE';
  };
  targetMemberId: string;
  permissionType: string | null;
}

export interface PatchSharedPageInvitationData {
  requestId: string;
  requestId: string;
  requestStatus: string;
  notificationType: string;
}
