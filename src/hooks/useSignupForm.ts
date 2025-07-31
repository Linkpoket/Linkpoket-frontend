import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signupSchema, FormData } from '@/schemas/signup';
import { useSignupSubmit } from './useSignupSubmit';

export const useSignupForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      ageRange: '',
      gender: '',
      job: '',
      customJob: '',
      nickname: '',
      termsAgreed: false,
    },
  });

  const [termsStatus, setTermsStatus] = useState({
    terms1: false,
    terms2: false,
  });

  const { onSubmit } = useSignupSubmit();

  const handleTermChange = (
    termName: 'terms1' | 'terms2',
    checked: boolean
  ) => {
    const newTermsStatus = { ...termsStatus, [termName]: checked };
    setTermsStatus(newTermsStatus);

    const allAgreed = Object.values(newTermsStatus).every((status) => status);
    form.setValue('termsAgreed', allAgreed, { shouldValidate: true });
  };

  return {
    ...form,
    termsStatus,
    handleTermChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
