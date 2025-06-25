import landingImage3 from '@/assets/common-ui-assets/landingImage3.png';
import landingImage4 from '@/assets/common-ui-assets/landingImage4.png';

const featureData = [
  {
    title: '흩어진 링크, 폴더별로 한 곳에서 정리',
    description: (
      <>
        개인 메모앱, 채팅방, 브라우저 즐겨찾기 등 흩어진 링크들을 폴더로
        구조화해 한눈에 관리할 수 있습니다.
        <br />
        주제별로 정리하고, 검색도 간편하게!
      </>
    ),
    image: landingImage3,
    background: 'bg-white',
  },
  {
    title: '클릭 한 번으로 팀원과 바로 공유',
    description: (
      <>
        프로젝트나 스터디 팀원과 링크를 공유하고 함께 관리할 수 있습니다.
        <br />
        중복 링크 없이 협업이 훨씬 쉬워집니다.
      </>
    ),
    image: landingImage4,
    background: 'bg-white',
  },
];

const FeatureSection: React.FC = () => {
  return (
    <>
      {featureData.map((feature, index) => (
        <section
          key={index}
          className={`pt-[152px] ${feature.background} feature-section-mobile feature-section-tablet feature-section-desktop`}
        >
          <div className="feature-container-mobile feature-container-tablet feature-container-desktop mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 items-center">
              <div>
                <h2 className="feature-title-mobile feature-title-tablet feature-title-desktop mb-6 text-[38px] font-bold text-gray-100 md:text-3xl lg:text-4xl">
                  {feature.title}
                </h2>
                <p className="text-gray-70 feature-description-mobile feature-description-tablet feature-description-desktop text-[18px] font-medium">
                  {feature.description}
                </p>
                <div className="mt-8 flex justify-center rounded-lg">
                  <img
                    src={feature.image}
                    alt={`${feature.title} 기능 이미지`}
                    className="feature-image-mobile feature-image-tablet feature-image-desktop"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default FeatureSection;
