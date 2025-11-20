import { axiosInstance } from '../axiosInstance';
import { UpdateDragandDropProps } from '@/types/folders';

export default async function updateDragandDrop(data: UpdateDragandDropProps) {
  try {
    // 백엔드 API는 parentFolderId를 요구하므로 toFolderId를 parentFolderId로 매핑
    const requestData = {
      baseRequest: data.baseRequest,
      targetId: data.targetId,
      itemType: data.itemType,
      parentFolderId: data.toFolderId, // toFolderId를 parentFolderId로 사용
      newOrderIndex: data.newOrderIndex,
    };

    const response = await axiosInstance.put(
      '/api/folders/reorder',
      requestData
    );
    return response.data;
  } catch (error) {
    console.error('드래그 앤 드롭 업데이트 실패:', error);
    throw error;
  }
}
