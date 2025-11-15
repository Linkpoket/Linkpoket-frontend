export type CommandType = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';

export type BaseRequest = {
  pageId: string;
  commandType: CommandType;
};

export type LinkBaseFields = {
  linkName: string;
  linkUrl: string;
};

export type LinkIdentity = {
  linkId: string;
};

type WithBaseRequest<T> = T & {
  baseRequest: BaseRequest;
};

export interface LinkDetail extends LinkBaseFields, LinkIdentity {
  isFavorite: boolean;
  faviconUrl: string;
  representImageUrl: string;
  providerName: string;
  orderIndex: number;
  createdDate: string | number;
}

// 요청 데이터 타입들
export type CreateLinkData = WithBaseRequest<
  LinkBaseFields & {
    folderId: string;
    description: string;
  }
>;

export type UpdateLinkData = WithBaseRequest<LinkBaseFields & LinkIdentity>;

export type DeleteLinkData = WithBaseRequest<LinkIdentity>;

export type PreviewLinkData = WithBaseRequest<Pick<LinkBaseFields, 'linkUrl'>>;

export type CommonApiResponse = {
  status: number;
  message: string;
  data: string;
};

export type CreateLinkResponse = CommonApiResponse;
export type UpdateLinkResponse = CommonApiResponse;
export type DeleteLinkResponse = CommonApiResponse;
export type PreviewLinkResponse = CommonApiResponse;
