import { BaseRequest, CommandType } from './links';

// LinkMemo 관련 타입 정의

export interface LinkMemoResponse {
  linkMemoId: string;
  linkId: string;
  content: string;
  createdDate: string;
  memberNickname: string;
  memberId: string;
}

export interface LinkMemoCreateRequest {
  baseRequest: BaseRequest;
  linkId: string;
  content: string;
}

export interface LinkMemoDeleteRequest {
  baseRequest: BaseRequest;
  linkMemoId: string;
}

export interface LinkMemoCreateResponse {
  linkMemoId: string;
}

export interface LinkMemoDeleteResponse {
  linkMemoId: string;
}

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T | null;
}

export type LinkMemoResponseWrapper = ApiResponseStructure<LinkMemoResponse>;
export type LinkMemoCreateResponseWrapper =
  ApiResponseStructure<LinkMemoCreateResponse>;
export type LinkMemoDeleteResponseWrapper =
  ApiResponseStructure<LinkMemoDeleteResponse>;
