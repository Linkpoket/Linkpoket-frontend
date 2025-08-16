import { TransferFolderData } from '@/types/folders';
import { axiosInstance } from '../axiosInstance';
import axios from 'axios';

export class TransferFolderError extends Error {
  constructor(
    public errorCode: string,
    public status: number,
    public detail: string,
    public instance: string
  ) {
    super(detail);
    this.name = 'TransferFolderError';
  }
}

export async function transferFolder(data: TransferFolderData) {
  try {
    const res = await axiosInstance.post(
      '/api/dispatch/directory-transmissions',
      data
    );

    console.log('🟢 API 응답 성공:', res.status, res.data);

    // 응답 데이터에 에러 정보가 있는지 확인
    if (res.data?.errorCode) {
      console.log('🔴 응답은 성공했지만 에러 데이터 포함:', res.data);
      throw new TransferFolderError(
        res.data.errorCode,
        res.data.status || res.status,
        res.data.detail || '알 수 없는 오류가 발생했습니다.',
        res.data.instance || ''
      );
    }

    return res.data;
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      console.log('[TX][ERR] status:', e.response?.status);
      console.log('[TX][ERR] body:', e.response?.data);
      console.log('[TX][ERR] sent:', e.config?.data);

      // 서버에서 온 에러 정보를 구조화된 형태로 던지기
      const errorData = e.response?.data;
      if (errorData?.errorCode) {
        throw new TransferFolderError(
          errorData.errorCode,
          errorData.status || e.response?.status || 500,
          errorData.detail || '알 수 없는 오류가 발생했습니다.',
          errorData.instance || ''
        );
      }
    }
    throw e;
  }
}
