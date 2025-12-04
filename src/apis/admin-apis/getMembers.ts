import { axiosInstance } from '../axiosInstance';

export interface AdminMember {
  memberId: string;
  email: string;
  nickname: string;
  role: string;
  memberGrade: string;
  provider: string;
  isSignedUp: boolean;
  createdAt: string;
  editedAt: string;
}

export interface AdminMemberListResponse {
  content: AdminMember[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GetMembersParams {
  search?: string;
  page?: number;
  size?: number;
}

export async function getMembers(
  params?: GetMembersParams
): Promise<AdminMemberListResponse> {
  const response = await axiosInstance.get<{
    data: AdminMemberListResponse;
  }>('/api/admin/members', {
    params: {
      search: params?.search,
      page: params?.page ?? 0,
      size: params?.size ?? 30,
    },
  });

  return response.data.data;
}
