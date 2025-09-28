import { axiosInstance } from '../axiosInstance';

export interface UpdateSharedPageVisibilitryData {
  baseRequest: {
    pageId: string;
    commandType: 'EDIT';
  };
  pageVisibility: 'PUBLIC' | 'RESTRICTED';
}

export default async function updateSharedPageVisibilitry(
  data: UpdateSharedPageVisibilitryData
) {
  try {
    const response = await axiosInstance.put('/api/pages/visibility', data);
    return response.data;
  } catch (error) {
    console.error('Error updating shared page visibilitry:', error);
    throw error;
  }
}
