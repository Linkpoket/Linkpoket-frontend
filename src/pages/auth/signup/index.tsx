import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/Input';
import { Radio } from '@/shared/ui/Radio';
import { Checkbox } from '@/shared/ui/CheckBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValid, z } from 'zod';

// Zod 스키마 정의
const signupSchema = z.object({
  ageGroup: z.string().min(1, '연령대를 선택해주세요.'),
  gender: z.string().min(1, '성별을 선택해주세요.'),
  job: z.string().min(1, '직업을 입력해주세요.'),
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .max(10, '닉네임은 최대 10글자까지 입력 가능합니다.'),
  termsAgreed: z
    .boolean()
    .refine((val) => val === true, { message: '약관에 동의해주세요' }),
});

// Zod 스키마에서 타입 추출
type FormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  // react-hook-form 설정 (zod resolver 사용)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      ageGroup: '',
      gender: '',
      job: '',
      nickname: '',
      termsAgreed: false,
    },
  });

  // 폼 제출 처리
  const onSubmit = async (data: FormData) => {
    // API 호출 시뮬레이션
    console.log('회원가입 데이터:', data);

    try {
      // 실제 API 호출 로직
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('회원가입이 완료되었습니다!');
      // 회원가입 성공 후 페이지 이동 로직
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        <h1 className="flex justify-center text-[28px] font-bold mb-8">
          링크모아 회원 가입
        </h1>

        {/* 연령대 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">연령대</label>
          <div className="flex flex-row space-x-4">
            <Controller
              name="ageGroup"
              control={control}
              render={({ field }) => (
                <>
                  <Radio
                    label="10대"
                    value="10s"
                    error={!!errors.ageGroup}
                    checked={field.value === '10s'}
                    onChange={() => field.onChange('10s')}
                  />
                  <Radio
                    label="20대"
                    value="20s"
                    error={!!errors.ageGroup}
                    checked={field.value === '20s'}
                    onChange={() => field.onChange('20s')}
                  />
                  <Radio
                    label="30대"
                    value="30s"
                    error={!!errors.ageGroup}
                    checked={field.value === '30s'}
                    onChange={() => field.onChange('30s')}
                  />
                  <Radio
                    label="40대 이상"
                    value="40plus"
                    error={!!errors.ageGroup}
                    checked={field.value === '40plus'}
                    onChange={() => field.onChange('40plus')}
                  />
                </>
              )}
            />
          </div>
          {errors.ageGroup && (
            <p className="mt-1 text-sm text-red-500">
              {errors.ageGroup.message}
            </p>
          )}
        </div>

        {/* 성별 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">성별</label>
          <div className="flex flex-row space-x-4">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <>
                  <Radio
                    label="남성"
                    value="male"
                    error={!!errors.gender}
                    checked={field.value === 'male'}
                    onChange={() => field.onChange('male')}
                  />
                  <Radio
                    label="여성"
                    value="female"
                    error={!!errors.gender}
                    checked={field.value === 'female'}
                    onChange={() => field.onChange('female')}
                  />
                </>
              )}
            />
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>

        {/* 직업 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">직업</label>
          <Controller
            name="job"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="현재 직업을 선택해주세요."
                variant={errors.job ? 'error' : 'default'}
                errorMessage={errors.job?.message}
              />
            )}
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">닉네임</label>
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="사용하실 닉네임을 입력해주세요."
                variant={errors.nickname ? 'error' : 'default'}
                errorMessage={errors.nickname?.message}
              />
            )}
          />
        </div>

        {/* 약관 */}
        <div className="space-y-2">
          <Controller
            name="termsAgreed"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="아래 약관에 모두 동의합니다."
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          {errors.termsAgreed && (
            <p className="text-sm text-red-500">{errors.termsAgreed.message}</p>
          )}

          {/* 약관 항목 1 */}
          <div
            className={`flex justify-between items-center text-sm ${errors.termsAgreed ? 'text-red-500' : 'text-gray-700'} pl-1`}
          >
            <div className="flex items-center space-x-1">
              <span className="text-orange-500">✓</span>
              <span>(필수) 링크모아 이용약관 동의</span>
            </div>
            <button type="button" className="text-gray-500 underline">
              보기
            </button>
          </div>

          {/* 약관 항목 2 */}
          <div
            className={`flex justify-between items-center text-sm ${errors.termsAgreed ? 'text-red-500' : 'text-gray-700'} pl-1`}
          >
            <div className="flex items-center space-x-1">
              <span className="text-orange-500">✓</span>
              <span>(필수) 개인정보 처리방침 동의</span>
            </div>
            <button type="button" className="text-gray-500 underline">
              보기
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? '처리 중...' : '회원 가입'}
        </Button>
      </form>
    </main>
  );
};

export default SignupPage;
