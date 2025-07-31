import { z } from 'zod';

export const signupSchema = z
  .object({
    ageRange: z.string().min(1, '연령대를 선택해주세요.'),
    gender: z.string().min(1, '성별을 선택해주세요.'),
    job: z.string().min(1, '직업을 선택해주세요.'),
    customJob: z.string().optional(),
    colorCode: z.string().optional(),
    nickname: z
      .string()
      .min(1, '닉네임을 입력해주세요.')
      .max(10, '닉네임은 최대 10글자까지 입력 가능합니다.'),
    termsAgreed: z
      .boolean()
      .refine((val) => val === true, { message: '약관에 동의해주세요' }),
  })
  .refine(
    (data) => {
      if (data.job === 'other') {
        return !!data.customJob && data.customJob.trim() !== '';
      }
      return true;
    },
    {
      message: '직업을 입력해주세요.',
      path: ['customJob'],
    }
  );

export type FormData = z.infer<typeof signupSchema>;
