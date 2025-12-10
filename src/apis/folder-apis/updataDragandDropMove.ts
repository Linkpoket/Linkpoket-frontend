import { axiosInstance } from '../axiosInstance';
import { UpdateDragandDropMoveProps } from '@/types/folders';

export default async function updataDragandDropMove(
  data: UpdateDragandDropMoveProps
) {
  try {
    const response = await axiosInstance.put('/api/folders/move', data);
    return response.data;
  } catch (error) {
    console.error('updataDragandDropMove API 에러:', error);
    throw error;
  }
}
