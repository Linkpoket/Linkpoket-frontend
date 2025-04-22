import { Button } from '@/components/common-ui/button';
import LandingMainWebp from '@/assets/common-ui-assets/LandingMain.webp';

const HeroSection: React.FC = () => {
  const heroTitles = ['링크를 한눈에', '모아두고', '간편하게 관리하세요'];

  const buttonVariants = [
    {
      text: '링크루 시작하기',
      href: '/signup',
      className: '',
    },
    {
      text: '구글 확장 프로그램 무료 다운로드',
      href: '/extension',
      className: 'bg-primary-10 text-primary-60',
    },
  ];

  return (
    <section className="bg-primary-5 flex min-h-screen items-center justify-center py-10">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-10 px-4 md:px-8 lg:flex-row lg:gap-16">
        <header className="w-full lg:w-auto">
          <div className="mb-5 md:mb-8">
            {heroTitles.map((title, index) => (
              <h1
                key={index}
                className={`text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-[56px] ${
                  index === 0 ? 'text-primary-50' : 'text-gray-100'
                }`}
              >
                {title}
              </h1>
            ))}
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-5">
            {buttonVariants.map(({ text, href, className }, index) => (
              <a key={index} href={href}>
                <Button
                  className={`px-4 py-3 text-sm md:px-6 md:py-4 md:text-base lg:px-[18px] lg:py-[20px] ${className} ${index === 0 ? 'hover:bg-primary-40 active:bg-primary-60' : 'hover:bg-primary-20 active:bg-primary-30'}`}
                >
                  {text}
                </Button>
              </a>
            ))}
          </div>
        </header>
        <div className="flex w-full justify-center lg:w-auto lg:justify-end">
          <img
            src={LandingMainWebp}
            alt="Landing page main illustration"
            className="h-auto w-full max-w-[500px] lg:w-auto lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
