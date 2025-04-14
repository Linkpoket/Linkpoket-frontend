import axios, { AxiosError } from 'axios';
import { z } from 'zod';

export const client = axios.create({
  baseURL: 'http://dev.linkrew.com /api',
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
