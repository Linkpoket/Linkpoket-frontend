import { Controller } from 'react-hook-form';
import { Input } from '@/components/common-ui/Input';
import { Radio } from '@/components/common-ui/Radio';
import { Select } from '@/components/common-ui/Select';
import { AGE_OPTIONS, GENDER_OPTIONS, JOB_OPTIONS } from '@/constants/signup';

interface FormFieldsProps {
  control: any;
  errors: any;
  selectedJob: string;
}

export const FormFields = ({
  control,
  errors,
  selectedJob,
}: FormFieldsProps) => {
  return (
    <>
      {/* 연령대 */}
      <fieldset>
        <legend className="text-gray-70 mb-2 block font-medium">연령대</legend>
        <div className="flex flex-row space-x-4">
          <Controller
            name="ageRange"
            control={control}
            render={({ field }) => (
              <>
                {AGE_OPTIONS.map((opt) => (
                  <Radio
                    size="sm"
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    error={!!errors.ageRange}
                    checked={field.value === opt.value}
                    onChange={() => field.onChange(opt.value)}
                    name="ageRange"
                  />
                ))}
              </>
            )}
          />
        </div>
        {errors.ageRange && (
          <p className="mt-1 text-sm text-red-500">{errors.ageRange.message}</p>
        )}
      </fieldset>

      {/* 성별 */}
      <fieldset>
        <legend className="text-gray-70 mb-2 block font-medium">성별</legend>
        <div className="flex flex-row space-x-4">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                {GENDER_OPTIONS.map((opt) => (
                  <Radio
                    size="sm"
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    error={!!errors.gender}
                    checked={field.value === opt.value}
                    onChange={() => field.onChange(opt.value)}
                    name="gender"
                  />
                ))}
              </>
            )}
          />
        </div>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
        )}
      </fieldset>

      {/* 직업 */}
      <fieldset>
        <legend className="text-gray-70 mb-2 block font-medium">직업</legend>
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
              name="job"
            />
          )}
        />

        {selectedJob === 'other' && (
          <div className="mt-2">
            <Controller
              name="customJob"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  name="customJob"
                  placeholder="현재 활동 중인 직업 분야를 입력해 주세요"
                  variant={errors.customJob ? 'error' : 'default'}
                  errorMessage={errors.customJob?.message}
                />
              )}
            />
          </div>
        )}
      </fieldset>

      {/* 닉네임 */}
      <div>
        <label className="text-gray-70 mb-2 block font-medium">닉네임</label>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              name="nickname"
              placeholder="사용하실 닉네임을 입력해주세요."
              variant={errors.nickname ? 'error' : 'default'}
              errorMessage={errors.nickname?.message}
            />
          )}
        />
      </div>
    </>
  );
};
