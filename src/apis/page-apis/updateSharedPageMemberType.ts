import { UpdateSharedPagePermissionData } from '@/types/pages';
import { axiosInstance } from '../axiosInstance';

export default async function updateSharedPageMemberTy(
  data: UpdateSharedPagePermissionData
) {
  try {
    const response = await axiosInstance.put(
      '/api/share-pages/dashboard/members/permission',
      data
    );
    return response.data;
  } catch (error) {
    console.error('공유 페이지 멤버 권한 변경 실패:', error);
    throw error;
  }
}
