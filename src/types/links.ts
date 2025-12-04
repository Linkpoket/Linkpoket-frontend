// 공통 타입 및 상수

export type CommandType = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';

export type BaseRequest = {
  pageId: string;
  commandType: CommandType;
};

// 내부 재사용 타입

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

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T;
}

// 요청 데이터 타입

export type CreateLinkData = WithBaseRequest<
  LinkBaseFields & {
    folderId: string;
    description: string;
  }
>;

export type UpdateLinkData = WithBaseRequest<LinkBaseFields & LinkIdentity>;

export type DeleteLinkData = WithBaseRequest<LinkIdentity>;

export type PreviewLinkData = WithBaseRequest<Pick<LinkBaseFields, 'linkUrl'>>;

// 응답 데이터 타입

export interface LinkDetail extends LinkBaseFields, LinkIdentity {
  description: string;
  isFavorite: boolean;
  faviconUrl: string;
  representImageUrl: string;
  providerName: string;
  orderIndex: number;
  createdDate: string | number;
}

type CommonApiResponseContent = string;

export type CreateLinkResponse = ApiResponseStructure<CommonApiResponseContent>;
export type UpdateLinkResponse = ApiResponseStructure<CommonApiResponseContent>;
export type DeleteLinkResponse = ApiResponseStructure<CommonApiResponseContent>;
export type PreviewLinkResponse =
  ApiResponseStructure<CommonApiResponseContent>;
