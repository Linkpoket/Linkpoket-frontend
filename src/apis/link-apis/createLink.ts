import { CreateLinkData } from '@/types/links';
import { axiosInstance } from '../axiosInstance';

export async function createLink(data: CreateLinkData) {
  try {
    const response = await axiosInstance.post('/api/links', data);
    console.log('생성response:', response);
    return response.data;
  } catch (error) {
    console.log('Error creating link', error);
    throw error;
  }
}
