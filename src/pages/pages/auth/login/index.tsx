import Logo from '@/assets/common-ui-assets/Logo.svg?react';
import Kakao from '@/assets/common-ui-assets/Kakao.svg?react';
import Google from '@/assets/common-ui-assets/Google.svg?react';
import { SocialLoginButton } from '@/components/common-ui/SocialLoginButton';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const textData = [
    { text: '링크를 한눈에' },
    { text: '모아두고' },
    { text: '간편하게 관리하세요' },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <section className="flex w-full max-w-[460px] flex-col items-start">
        <Logo />
        <div className="mb-[56px] flex flex-col text-left text-[26px] font-bold">
          {textData.map((text, index) => {
            return (
              <span
                key={index}
                className={`${index === 0 ? 'text-primary-50 mt-4' : 'text-gray-100'}`}
              >
                {text.text}
              </span>
            );
          })}
        </div>

        <section className="w-full space-y-4">
          <SocialLoginButton
            provider="카카오"
            icon={Kakao}
            bgColor="bg-kakao-yellow"
            className="hover:bg-[#F4DC03] active:bg-[#F4DC03]"
            onClick={handleKakaoLogin}
          />

          <SocialLoginButton
            provider="Google"
            icon={Google}
            bgColor="bg-gray-5"
            className="hover:bg-[#E6E6E6] active:bg-[#E6E6E6]"
            onClick={handleGoogleLogin}
          />
        </section>
      </section>
    </main>
  );
};

export default LoginPage;
