import { axiosInstance } from '../axiosInstance';

export async function fetchPersonalPage() {
  try {
    const response = await axiosInstance.get('/api/personal-pages/main');
    return response.data;
  } catch (error) {
    console.error('Error fetching personal page:', error);
    throw error;
  }
}
