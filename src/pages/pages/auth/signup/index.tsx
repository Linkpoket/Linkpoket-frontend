import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/common-ui/Input';
import { Radio } from '@/components/common-ui/Radio';
import { Checkbox } from '@/components/common-ui/CheckBox';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/common-ui/button';
import { useEffect, useState } from 'react';
import { Select } from '@/components/common-ui/Select';

// Zod 스키마 정의
const signupSchema = z
  .object({
    ageGroup: z.string().min(1, '연령대를 선택해주세요.'),
    gender: z.string().min(1, '성별을 선택해주세요.'),
    job: z.string().min(1, '직업을 선택해주세요.'),
    customJob: z.string().optional(),
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

// 확장된 직업 옵션 리스트
const JOB_OPTIONS = [
  { value: 'student', label: '학생' },
  { value: 'it_developer', label: 'IT/개발' },
  { value: 'designer', label: '디자인' },
  { value: 'business', label: '비즈니스/경영' },
  { value: 'marketing', label: '마케팅/광고' },
  { value: 'education', label: '교육/연구' },
  { value: 'medical', label: '의료/보건' },
  { value: 'legal', label: '법률/법조' },
  { value: 'finance', label: '금융/회계' },
  { value: 'manufacturing', label: '제조/생산' },
  { value: 'architecture', label: '건축/토목/설계' },
  { value: 'service', label: '서비스/고객지원' },
  { value: 'media', label: '미디어/콘텐츠' },
  { value: 'government', label: '공공기관/정부/행정' },
  { value: 'engineering', label: '엔지니어링/기술직' },
  { value: 'logistics', label: '물류/운송/무역' },
  { value: 'art', label: '예술/문화/공연' },
  { value: 'environment', label: '농림어업/환경' },
  { value: 'sports', label: '스포츠/레저' },
  { value: 'other', label: '기타 (직접 입력)' },
];

type FormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      ageGroup: '',
      gender: '',
      job: '',
      customJob: '',
      nickname: '',
      termsAgreed: false,
    },
  });

  // 직업 선택값과 커스텀 직업값 감시
  const selectedJob = watch('job');
  const customJobValue = watch('customJob');

  // 개별 약관 동의 상태 관리
  const [termsStatus, setTermsStatus] = useState({
    terms1: false,
    terms2: false,
  });

  const termsAgreedValue = watch('termsAgreed');

  // 전체 동의 상태가 변경될 때 개별 약관 상태 업데이트
  useEffect(() => {
    setTermsStatus({
      terms1: termsAgreedValue,
      terms2: termsAgreedValue,
    });
  }, [termsAgreedValue]);

  // 개별 약관 변경 처리
  const handleTermChange = (
    termName: 'terms1' | 'terms2',
    checked: boolean
  ) => {
    const newTermsStatus = { ...termsStatus, [termName]: checked };
    setTermsStatus(newTermsStatus);

    // 모든 약관이 동의되었는지 확인
    const allAgreed = Object.values(newTermsStatus).every((status) => status);
    setValue('termsAgreed', allAgreed, { shouldValidate: true });
  };

  // 폼 제출 처리
  const onSubmit = async (data: FormData) => {
    // 제출할 최종 데이터 구성
    const submitData = {
      ...data,
      // 기타(직접입력)를 선택한 경우 customJob 값을 jobText로 추가
      jobText:
        data.job === 'other'
          ? data.customJob
          : JOB_OPTIONS.find((opt) => opt.value === data.job)?.label || '',
    };

    // API 호출 시뮬레이션
    console.log('회원가입 데이터:', submitData);

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
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[460px] max-w-md space-y-6"
      >
        <h1 className="mb-8 flex justify-center text-[26px] font-bold">
          링크모아 회원 가입
        </h1>

        {/* 연령대 */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">연령대</label>
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
          <label className="mb-2 block font-medium text-gray-700">성별</label>
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
          <label className="mb-2 block font-medium text-gray-700">직업</label>
          <Controller
            name="job"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={JOB_OPTIONS}
                placeholder="선택해 주세요"
                error={!!errors.job}
                errorMessage={errors.job?.message}
                maxHeight="370px"
              />
            )}
          />

          {/* 기타 직업 직접 입력 필드 (기타 선택 시에만 표시) */}
          {selectedJob === 'other' && (
            <div className="mt-2">
              <Controller
                name="customJob"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="현재 활동 중인 직업 분야를 입력해 주세요"
                    variant={errors.customJob ? 'error' : 'default'}
                    errorMessage={errors.customJob?.message}
                  />
                )}
              />
            </div>
          )}
        </div>

        {/* 닉네임 */}
        <div>
          <label className="mb-2 block font-medium text-gray-700">닉네임</label>
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
            className={`flex items-center justify-between text-sm ${errors.termsAgreed ? 'text-red-500' : 'text-gray-700'}`}
          >
            <div className="flex items-center space-x-1">
              <Checkbox
                checked={termsStatus.terms1}
                onChange={(e) => handleTermChange('terms1', e.target.checked)}
                variant="checkOnly"
              />
              <span>(필수) 링크모아 이용약관 동의</span>
            </div>
            <button type="button" className="text-gray-500 underline">
              보기
            </button>
          </div>

          {/* 약관 항목 2 */}
          <div
            className={`flex items-center justify-between text-sm ${errors.termsAgreed ? 'text-red-500' : 'text-gray-700'}`}
          >
            <div className="flex items-center space-x-1">
              <Checkbox
                checked={termsStatus.terms2}
                onChange={(e) => handleTermChange('terms2', e.target.checked)}
                variant="checkOnly"
              />
              <span>(필수) 개인정보 처리방침 동의</span>
            </div>
            <button type="button" className="text-gray-500 underline">
              보기
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-lg bg-orange-500 font-medium text-white transition-colors hover:bg-orange-600"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? '처리 중...' : '회원 가입'}
        </Button>
      </form>
    </main>
  );
};

export default SignupPage;
