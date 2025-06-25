import { CreateLinkData, CreateLinkResponse } from '@/types/links';
import { axiosInstance } from '../axiosInstance';

export async function createLink(
  data: CreateLinkData
): Promise<CreateLinkResponse> {
  try {
    const response = await axiosInstance.post('/api/links', data);
    return response.data;
  } catch (error) {
    console.log('Error creating link', error);
    throw error;
  }
}
