import { axiosInstance } from '../axiosInstance';

export async function fetchJoinedPage() {
  try {
    const response = await axiosInstance.get('/api/personal-pages/overview');
    return response.data;
  } catch (error) {
    console.error('Error fetching joined page:', error);
    throw error;
  }
}
