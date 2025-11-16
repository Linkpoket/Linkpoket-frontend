import { useState } from 'react';
import { Button } from '@/components/common-ui/button';
import { useSignupForm } from '@/hooks/useSignupForm';
import { FormFields } from '@/components/signup/FormFields';
import { TermsSection } from '@/components/signup/TermsSection';
import { TermsModal } from '@/components/modal/signup/TermsModal';
import { PrivacyModal } from '@/components/modal/signup/PrivacyModal';
import Logo from '@/assets/widget-ui-assets/Logo.svg?react';

const SignupPage = () => {
  const {
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
    termsStatus,
    handleTermChange,
    onSubmit,
    handleToggleAll,
  } = useSignupForm();

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const selectedJob = watch('job');

  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-white">
      <form onSubmit={onSubmit} className="w-[360px] max-w-md space-y-6">
        <Logo className="mx-auto mb-4 h-18 w-18" />
        <h2 className="mb-8 flex justify-center text-[26px] font-bold">
          링크포켓 회원 가입
        </h2>

        <FormFields
          control={control}
          errors={errors}
          selectedJob={selectedJob}
        />

        <TermsSection
          control={control}
          errors={errors}
          termsStatus={termsStatus}
          handleTermChange={handleTermChange}
          setShowTermsModal={setShowTermsModal}
          setShowPrivacyModal={setShowPrivacyModal}
          handleToggleAll={handleToggleAll}
        />

        <Button
          type="submit"
          className="h-12 w-full rounded-lg font-medium text-white transition-colors"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? '처리 중...' : '회원 가입'}
        </Button>
      </form>

      {showTermsModal && (
        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />
      )}
      {showPrivacyModal && (
        <PrivacyModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
        />
      )}
    </main>
  );
};

export default SignupPage;
