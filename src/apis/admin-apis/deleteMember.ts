import { axiosInstance } from '../axiosInstance';

export async function deleteMember(memberId: string): Promise<void> {
  await axiosInstance.delete(`/api/admin/members/${memberId}`);
}
