import Logo from '@/assets/common-ui-assets/Logo.svg?react';
import landingImage2 from '@/assets/common-ui-assets/landingImage2.png';

const ProblemSection: React.FC = () => {
  return (
    <section className="problem-section-mobile problem-section-desktop problem-section-tablet bg-white">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="problem-title-mobile problem-title-tablet text-[38px] font-bold">
          혹시 이런 적 있나요?
        </h2>

        <img
          src={landingImage2}
          className="hero-image-mobile hero-image-tablet hero-image-desktop"
        />

        {/* LINKREW 소개 */}
        <div className="linkrew-intro-mobile linkrew-intro-tablet linkrew-intro-desktop mt-[152px] flex flex-col items-center">
          <Logo className="linkrew-logo-mobile linkrew-logo-tablet linkrew-logo-desktop h-[122px] w-[122px] object-contain" />
          <p className="linkrew-title-mobile linkrew-title-tablet linkrew-title-desktop">
            그럴 땐, <span className="text-primary-50">LINKREW</span> 하나면
            충분해요
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
