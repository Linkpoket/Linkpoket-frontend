import Logo from '@/assets/common-ui-assets/Logo.svg?react';
import Kakao from '@/assets/common-ui-assets/Kakao.svg?react';
import Google from '@/assets/common-ui-assets/Google.svg?react';
import { SocialLoginButton } from '@/components/common-ui/SocialLoginButton';
import { NaverIcon } from '@/components/common-ui/NaverIcon';
import { GithubIcon } from '@/components/common-ui/GithubIcon';

const LoginPage = () => {
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
            provider="카카오 로그인"
            icon={Kakao}
            bgColor="bg-kakao-yellow"
            className="hover:bg-[#F4DC03] active:bg-[#F4DC03]"
            onClick={() =>
              (window.location.href =
                'http://localhost:8080/oauth2/authorization/kakao')
            }
          />

          <SocialLoginButton
            provider="Google 로그인"
            icon={Google}
            bgColor="bg-gray-5"
            className="hover:bg-[#E6E6E6] active:bg-[#E6E6E6]"
            onClick={() =>
              (window.location.href =
                'http://localhost:8080/oauth2/authorization/google')
            }
          />
        </section>
        {/* 구분선 */}
        <div className="flex w-full items-center justify-center">
          <div className="flex-grow border-t-[0.5px] border-gray-50" />
          <div className="mx-4 whitespace-nowrap">또는</div>
          <div className="flex-grow border-t-[0.5px] border-gray-50 text-[14px] font-normal" />
        </div>

        {/* 하단 아이콘 */}
        <div className="mt-4 flex w-full items-center justify-center space-x-4">
          <SocialLoginButton
            icon={NaverIcon}
            bgColor="bg-transparent"
            className="h-[42px] w-[42px] rounded-full p-0 hover:bg-[#2FD057]"
            iconClassName="text-[#06BE34] group-hover:text-white"
            onClick={() =>
              (window.location.href =
                'http://localhost:8080/oauth2/authorization/naver')
            }
            noMargin={true}
          />
          <SocialLoginButton
            icon={GithubIcon}
            bgColor=""
            className="group h-[42px] w-[42px] rounded-full p-0"
            noMargin={true}
            onClick={() =>
              (window.location.href =
                'http://localhost:8080/oauth2/authorization/github')
            }
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
