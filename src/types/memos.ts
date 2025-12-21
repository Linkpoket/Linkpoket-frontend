import { BaseRequest } from './links';

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T;
}

// ItemType (백엔드와 동일하게)
export type ItemType = 'LINK' | 'FOLDER';

// Memo 관련 타입 정의
export interface MemoResponse {
  memoId: string;
  itemType: ItemType;
  itemId: string;
  content: string;
  createdDate: string;
  memberNickname: string;
  memberId: string;
}

export interface MemoCreateRequest {
  baseRequest: BaseRequest;
  itemType: ItemType;
  itemId: string;
  content: string;
}

export interface MemoDeleteRequest {
  baseRequest: BaseRequest;
  memoId: string;
}

export interface MemoCreateResponse {
  memoId: string;
}

export interface MemoDeleteResponse {
  memoId: string;
}

export type MemoResponseWrapper = ApiResponseStructure<MemoResponse | null>;
export type MemoCreateResponseWrapper =
  ApiResponseStructure<MemoCreateResponse>;
export type MemoDeleteResponseWrapper =
  ApiResponseStructure<MemoDeleteResponse>;
