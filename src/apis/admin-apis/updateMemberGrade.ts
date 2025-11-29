import { axiosInstance } from '../axiosInstance';

export interface UpdateMemberGradeRequest {
  memberId: string;
  memberGrade: string;
}

export async function updateMemberGrade(
  request: UpdateMemberGradeRequest
): Promise<void> {
  await axiosInstance.patch('/api/admin/members/grade', request);
}
