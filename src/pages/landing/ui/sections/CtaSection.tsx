import { Button } from '@/shared/ui/button';
import FooterBg from '@/shared/assets/FooterBg.svg?react';

const CtaSection: React.FC = () => {
  const ctaTitles = ['링크 정리,', '지금 1분 만에 시작해보세요'];

  const ctaButtons = [
    {
      text: '링크루 시작하기',
      href: '/signup',
      className:
        'bg-primary-0 text-primary-60 active:bg-primary-0 hover:bg-gray-5',
    },
    {
      text: '구글 확장 프로그램 무료 다운로드',
      href: '/extension',
      className:
        'bg-primary-50 text-gray-0 border-1 border-white active:bg-primary-50 hover:bg-primary-60',
    },
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <FooterBg
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          {ctaTitles.map((title, index) => (
            <h2
              key={index}
              className="text-gray-0 text-[56px] leading-[140%] font-bold"
            >
              {title}
            </h2>
          ))}

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            {ctaButtons.map(({ text, href, className }) => (
              <a key={href} href={href}>
                <Button
                  className={`px-4 py-3 text-sm md:px-6 md:py-4 md:text-base lg:px-[18px] lg:py-[20px] ${className}`}
                >
                  {text}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
