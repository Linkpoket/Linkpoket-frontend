import { axiosInstance } from '../axiosInstance';

export async function fetchFavorite() {
  try {
    const response = await axiosInstance.get('/api/favorite');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite:', error);
    throw error;
  }
}
