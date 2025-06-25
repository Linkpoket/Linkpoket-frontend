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
    console.error('Error updating shared page member type:', error);
    throw error;
  }
}
