import YellowCheck from '@/shared/assets/YellowCheck.svg?react';
import LinkManagementImg from '@/shared/assets/LinkManagementImg.svg?react';
import Logo from '@/shared/assets/Logo.svg?react';

const ProblemSection: React.FC = () => {
  const problemDescriptions = [
    {
      texts: [
        { text: '필요한 링크를 찾느라', highlight: true },
        { text: '매번 메모앱이나 채팅방을 뒤져본 적', highlight: false },
      ],
    },
    {
      texts: [
        { text: '브라우저마다 즐겨찾기 위치가 달라서', highlight: false },
        { text: '다시 검색하느라 시간을 낭비했던 적', highlight: true },
      ],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <h2 className="mb-16 text-3xl font-bold md:text-4xl">
          혹시 이런 적 있나요?
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 문제점 설명 */}
          <div className="space-y-8">
            {problemDescriptions.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-5 rounded-[20px] px-[54px] py-[68px]"
              >
                <div className="flex items-center">
                  <YellowCheck className="h-[51px] w-[51px]" />
                  <div className="ml-4">
                    {problem.texts.map((textItem, textIndex) => (
                      <p
                        key={textIndex}
                        className={`text-[32px] font-semibold ${
                          textItem.highlight ? 'text-primary-50' : ''
                        }`}
                      >
                        {textItem.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 링크 일러스트레이션 */}
          <div className="bg-primary-5 flex items-center justify-center rounded-[20px] px-[104px] py-[82px]">
            <LinkManagementImg />
          </div>
        </div>

        {/* LINKREW 소개 */}
        <div className="mt-[152px] flex flex-col items-center text-center">
          <Logo className="mb-9 h-[122px] w-[122px]" />
          <p className="mb-2 text-[46px] font-bold">
            그럴 땐, <span className="text-primary-50">LINKREW</span> 하나면
            충분해요
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
