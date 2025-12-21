import { axiosInstance } from '../axiosInstance';

export interface UploadFileParams {
  file: File;
  pageId: string;
  commandType: 'CREATE';
  folderId?: string;
}

export async function uploadFile(data: UploadFileParams) {
  try {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('pageId', data.pageId);
    formData.append('commandType', data.commandType);
    if (data.folderId) {
      formData.append('folderId', data.folderId);
    }

    const baseURL = import.meta.env.VITE_API_URL;
    const url = `${baseURL}/api/files/upload`;

    console.log('파일 업로드 요청:', {
      url,
      baseURL,
      pageId: data.pageId,
      folderId: data.folderId,
      fileName: data.file.name,
    });

    const response = await axiosInstance.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('파일 업로드 실패:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config?.baseURL + error.config?.url,
    });
    throw error;
  }
}
