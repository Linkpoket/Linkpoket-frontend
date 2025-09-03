import axios, { AxiosError } from 'axios';
import { z } from 'zod';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 요청 전마다 accessToken을 최신 상태로 헤더에 넣어줌
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
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
            axiosInstance.defaults.headers.common['Authorization'] =
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

        return axiosInstance(originalRequest);
      } catch (e) {
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

//백엔드 api 유효성 검증 에러 응답
export function handleGenericError(error: AxiosError) {
  const validation = GenericErrorSchema.safeParse(error.response?.data);

  if (validation.error) {
    return error;
  }

  const message = formatValidationErrors(validation.data);

  return new AxiosError(
    message,
    error.code,
    error.config,
    error.request,
    error.response
  );
}

const GenericErrorSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

type GenericError = z.infer<typeof GenericErrorSchema>;

function formatValidationErrors(data: GenericError): string {
  return Object.entries(data.errors)
    .map(([field, messages]) =>
      messages.map((message) => `${field}: ${message}`).join('\n')
    )
    .join('\n');
}
