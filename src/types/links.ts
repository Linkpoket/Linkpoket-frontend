type CommandType = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';

export type BaseRequest = {
  pageId: string;
  commandType: CommandType;
};

export interface LinkDetail {
  linkId: string;
  linkName: string;
  linkUrl: string;
  isFavorite: boolean;
  faviconUrl: string;
  representImageUrl: string;
  createdDate: string;
  providerName: string;
  orderIndex: number;
}

export type CreateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  directoryId: string;
  faviconUrl: string;
};

export type DeleteLinkData = {
  baseRequest: BaseRequest;
  linkId: string;
};

export type UpdateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  linkId: string;
};

export type CommonApiResponse = {
  status: number;
  message: string;
  data: number;
};

export type CreateLinkResponse = CommonApiResponse;
export type UpdateLinkResponse = CommonApiResponse;
export type DeleteLinkResponse = CommonApiResponse;
