import { PreviewLinkData, PreviewLinkResponse } from '@/types/links';
import { axiosInstance } from '../axiosInstance';

export async function previewLink(
  data: PreviewLinkData
): Promise<PreviewLinkResponse> {
  try {
    const response = await axiosInstance.post('/api/links/title-preview', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
