import axios, { AxiosError } from 'axios';
import { z } from 'zod';

const apiErrorSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  instance: z.string().optional(),
  errorCode: z.string(),
});

export type BackendError = z.infer<typeof apiErrorSchema>;

export interface StructuredAxiosError extends AxiosError {
  errorData?: BackendError;
}

export function handleApiError(error: unknown): StructuredAxiosError | Error {
  //  AxiosError가 아닌 경우 처리
  if (!axios.isAxiosError(error)) {
    return error instanceof Error
      ? error
      : new Error(String(error) || '알 수 없는 오류가 발생했습니다.');
  }

  const structuredError = error as StructuredAxiosError;

  const validation = apiErrorSchema.safeParse(structuredError.response?.data);

  if (!validation.success) {
    return structuredError;
  }

  const errorData = validation.data;

  structuredError.message = errorData.detail || errorData.title;

  structuredError.errorData = errorData;

  return structuredError;
}
