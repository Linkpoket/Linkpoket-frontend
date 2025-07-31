import { useState } from 'react';
import { Button } from '@/components/common-ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useSignupForm } from '@/hooks/useSignupForm';
import { FormFields } from '@/components/signup/FormFields';
import { TermsSection } from '@/components/signup/TermsSection';
import { TermsModal } from '@/components/modal/signup/TermsModal';
import { PrivacyModal } from '@/components/modal/signup/PrivacyModal';

const SignupPage = () => {
  const { isAuthenticated } = useAuth();
  const {
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
    termsStatus,
    handleTermChange,
    onSubmit,
  } = useSignupForm();

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const selectedJob = watch('job');

  console.log('사인업 페이지에서 isAuthenticated 상태', isAuthenticated);

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-white">
      <form onSubmit={onSubmit} className="w-[360px] max-w-md space-y-6">
        <h2 className="mb-8 flex justify-center text-[26px] font-bold">
          링크모아 회원 가입
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
        />

        <Button
          type="submit"
          className="h-12 w-full rounded-lg bg-orange-500 font-medium text-white transition-colors hover:bg-orange-600"
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
