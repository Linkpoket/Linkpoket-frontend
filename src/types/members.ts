// 공통 타입 및 상수

interface ApiResponseStructure<T> {
  status: number;
  message: string;
  data: T;
}

// 응답 데이터 타입

export interface PageMember {
  memberId: string;
  email: string;
  nickName: string;
  colorCode: string;
  role: 'HOST' | 'EDITOR' | 'VIEWER';
  isWaiting: boolean;
}

interface SharedPageDashboardResponseContent {
  pageId: string;
  visibility: 'PUBLIC' | 'RESTRICTED';
  pageType: 'SHARED';
  pageMembers: PageMember[];
}

export type SharedPageDashboardResponse =
  ApiResponseStructure<SharedPageDashboardResponseContent>;

interface SharedPageMemberListContent {
  memberId: string;
  email: string;
  nickName: string;
  colorCode: string;
}

export type SharedPageMemberList =
  ApiResponseStructure<SharedPageMemberListContent>;

interface PersonalUserInfoResponseContent {
  memberId: string;
  email: string;
  nickName: string;
  colorCode: string;
  foldeerColorCode: string;
}

export type PersonalUserInfoResponse =
  ApiResponseStructure<PersonalUserInfoResponseContent>;
