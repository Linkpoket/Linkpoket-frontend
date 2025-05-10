import axios, { AxiosError } from 'axios';
import { z } from 'zod';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// 요청 전마다 accessToken을 최신 상태로 헤더에 넣어줌
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log(`엑세스토큰: ${accessToken}`);
  return config;
});

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
