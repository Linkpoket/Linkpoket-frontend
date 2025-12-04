import axios, { AxiosInstance, AxiosError } from 'axios';
import { handleApiError } from '@/schemas/axioserror';

/* response 시 401 에러 시 토큰 갱신 및 재요청 및 api 에러 처리 */

export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as typeof error.config & {
        _retry?: boolean;
      };

      // 401 에러 시 토큰 갱신 시도
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Admin API인 경우
        if (originalRequest.url?.includes('/api/admin/')) {
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/admin/auth/refresh`,
              {},
              {
                withCredentials: true,
              }
            );

            const newAccessToken = res.headers['authorization']?.replace(
              'Bearer ',
              ''
            );

            if (newAccessToken) {
              try {
                localStorage.setItem('admin_access_token', newAccessToken);
                instance.defaults.headers.common['Authorization'] =
                  `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] =
                  `Bearer ${newAccessToken}`;
              } catch (storageError) {
                console.error('Admin 토큰 저장 실패:', storageError);
                throw storageError;
              }
            }

            return instance(originalRequest);
          } catch (e) {
            window.location.href = '/admin';
            return Promise.reject(e);
          }
        } else {
          // 일반 API인 경우
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/jwt/access-token`,
              {
                withCredentials: true,
              }
            );

            const newAccessToken = res.headers['authorization']?.replace(
              'Bearer ',
              ''
            );
            const newSseToken = res.data.data?.value;

            if (newAccessToken) {
              try {
                localStorage.setItem('access_token', newAccessToken);
                instance.defaults.headers.common['Authorization'] =
                  `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] =
                  `Bearer ${newAccessToken}`;
              } catch (storageError) {
                console.error('토큰 저장 실패:', storageError);
                throw storageError;
              }
            }

            if (newSseToken) {
              try {
                localStorage.setItem('sse_token', newSseToken);
              } catch (storageError) {
                console.error('SSE 토큰 저장 실패:', storageError);
              }
            }

            return instance(originalRequest);
          } catch (e) {
            window.location.href = '/login';
            return Promise.reject(e);
          }
        }
      }

      // API 에러 응답 처리
      return Promise.reject(handleApiError(error));
    }
  );
};
