export type BaseRequest = {
  pageId: number;
  commandType: string;
};

export type CreateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  directoryId: number;
  faviconUrl: string;
};

export type DeleteLinkData = {
  baseRequest: BaseRequest;
  linkId: number;
};

export type UpdateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  linkId: number;
};

export type UpdateLinkResponse = {
  status: number;
  message: string;
  data: number;
};
