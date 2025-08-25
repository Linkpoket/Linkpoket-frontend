import { axiosInstance } from '../axiosInstance';
import { UpdateDragandDropProps } from '@/types/folders';

export default async function updateDragandDrop(data: UpdateDragandDropProps) {
  try {
    const response = await axiosInstance.put('/api/folders/reorder', data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
