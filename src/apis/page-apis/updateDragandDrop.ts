import { axiosInstance } from '../axiosInstance';
import { UpdateDragandDropProps } from '@/types/pages';

export default async function updateDragandDrop(data: UpdateDragandDropProps) {
  try {
    const response = await axiosInstance.put(
      '/api/directories/drag-and-drop',
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
