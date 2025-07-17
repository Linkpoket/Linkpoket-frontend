import { Button } from '@/components/common-ui/button';
import FooterBg from '@/assets/common-ui-assets/FooterBg.svg?react';
import { useMobile } from '@/hooks/useMobile';

const CtaSection: React.FC = () => {
  const isMobile = useMobile();

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

  const feedbackData = [
    {
      description: (
        <>
          링크루 팀은
          <br />
          여러분들의 피드백을 적극 반영하고 싶어요!
        </>
      ),
      className: 'font-bold text-[20px] mb-4',
    },
    {
      description: (
        <>
          궁금한 점, 불편한 점, 제안하고 싶은 점 등 링크루에 관련한 질문이
          있으시다면,
          <br /> 아래 버튼을 클릭해서 자유롭게 작성해주세요 :)
        </>
      ),
      className: 'mb-8',
    },
  ];

  return (
    <>
      <section className="cta-section-mobile cta-section-tablet cta-section-desktop relative mt-[100px]">
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
                className="text-gray-0 cta-title-mobile cta-title-tablet cta-title-desktop text-[38px] leading-[1.4] font-bold"
              >
                {title}
              </h2>
            ))}

            <div className="cta-buttons-mobile cta-buttons-tablet cta-buttons-desktop mt-10 flex flex-col items-center gap-4 sm:flex-row">
              {ctaButtons.map(({ text, href, className }) => (
                <a key={href} href={href} className="w-full sm:w-auto">
                  <Button
                    className={`cta-button-mobile cta-button-desktop cta-button-tablet ${className}`}
                  >
                    {text}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 피드백 */}
      <div className="mx-auto flex max-w-[980px] flex-col justify-center px-[24px]">
        <div className="flex justify-center">
          <div className="my-20 flex flex-col-reverse md:w-full md:flex-row md:place-content-between">
            <div className="flex flex-col justify-center">
              {feedbackData.map((feature) => {
                return (
                  <p className={feature.className}>{feature.description}</p>
                );
              })}

              <a
                href="https://forms.gle/ZiqVVcvpCgiKzT9E6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit"
              >
                <Button
                  className="w-auto bg-none"
                  variant="ghost"
                  size={isMobile ? 'sm' : 'lg'}
                >
                  개선을 위한 의견을 남겨주세요
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaSection;
