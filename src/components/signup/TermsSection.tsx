import { Controller } from 'react-hook-form';
import { Checkbox } from '@/components/common-ui/CheckBox';
import { TERMS_ITEMS } from '@/constants/signup';

interface TermsSectionProps {
  control: any;
  errors: any;
  termsStatus: { terms1: boolean; terms2: boolean };
  handleTermChange: (termName: 'terms1' | 'terms2', checked: boolean) => void;
  setShowTermsModal: (show: boolean) => void;
  setShowPrivacyModal: (show: boolean) => void;
}

export const TermsSection = ({
  control,
  errors,
  termsStatus,
  handleTermChange,
  setShowTermsModal,
  setShowPrivacyModal,
}: TermsSectionProps) => {
  return (
    <div className="space-y-2">
      <Controller
        name="termsAgreed"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="아래 약관에 모두 동의합니다."
            name={field.name}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        )}
      />
      {errors.termsAgreed && (
        <p className="text-sm text-red-500">{errors.termsAgreed.message}</p>
      )}

      {TERMS_ITEMS.map((term) => (
        <div
          key={term.name}
          className={`flex items-center justify-between text-sm ${
            errors.termsAgreed ? 'text-red-500' : 'text-gray-700'
          }`}
        >
          <div className="flex items-center space-x-1">
            <Checkbox
              checked={termsStatus[term.name as keyof typeof termsStatus]}
              onChange={(e) =>
                handleTermChange(
                  term.name as 'terms1' | 'terms2',
                  e.target.checked
                )
              }
              variant="checkOnly"
            />
            <span>{term.label}</span>
          </div>
          <button
            type="button"
            className="text-gray-500 underline hover:cursor-pointer"
            onClick={() =>
              term.modal === 'terms'
                ? setShowTermsModal(true)
                : setShowPrivacyModal(true)
            }
          >
            보기
          </button>
        </div>
      ))}
    </div>
  );
};
