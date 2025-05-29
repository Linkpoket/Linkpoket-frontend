import { PageItemSearchRequest, PageItemSearchResponse } from '@/types/search';
import { axiosInstance } from '../axiosInstance';

export async function searchPageItems(
  data: PageItemSearchRequest
): Promise<PageItemSearchResponse> {
  try {
    const response = await axiosInstance.post('/api/search', data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
