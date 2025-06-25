import { UpdateLinkData, UpdateLinkResponse } from '@/types/links';
import { axiosInstance } from '../axiosInstance';

export async function updateLink(
  data: UpdateLinkData
): Promise<UpdateLinkResponse> {
  try {
    const response = await axiosInstance.put('/api/links', data);
    return response.data;
  } catch (error: unknown) {
    console.error('updateLink API 에러:', error);
    throw error;
  }
}
