import axios, { AxiosError } from 'axios';
import { z } from 'zod';

export const client = axios.create({
  baseURL: 'http://localhost:8080/api',
});

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
