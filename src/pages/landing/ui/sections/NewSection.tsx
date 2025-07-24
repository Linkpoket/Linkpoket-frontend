import 확장프로그램이미지 from '@/assets/common-ui-assets/확장 프로그램 이미지.png';
import 폴더별정리이미지 from '@/assets/common-ui-assets/폴더별정리이미지.png';
import 공유페이지이미지 from '@/assets/common-ui-assets/공유페이지이미지.jpg';

const NewSection = () => {
  const featureData = [
    {
      description: (
        <>
          모든 링크를 한 곳에,
          <br />
          쉽게 정리하고 꺼내보세요
        </>
      ),
      className: 'font-bold mb-4 text-[24px] md:text-[28px]',
    },
    {
      description: (
        <>
          링크 저장부터 공유까지, 개인은 물론 <br />
          팀까지 함께 쓰는 통합 링크 관리 서비스입니다.
        </>
      ),
      className: 'text-[14px] md:text-[18px]',
    },
  ];

  const secondData = [
    {
      item: (
        <>
          다시 보고 싶은 링크,
          <br />
          클릭 한 번으로 저장하세요
        </>
      ),
      className: 'font-bold mb-4 text-[28px]',
    },
    {
      item: (
        <>
          브라우저 주소창 우측에 있는
          <br />
          링크루 확장 프로그램 버튼을 클릭하면,
          <br />
          현재 보고 있는 사이트를 원하는 폴더에
          <br />
          즉시 저장할 수 있어요.
        </>
      ),
      className: '',
    },
  ];

  const thirdData = [
    {
      item: (
        <>
          카드 형식으로 보기 좋게,
          <br />
          폴더별로 정리까지
        </>
      ),
      className: 'font-bold mb-4 text-[28px]',
    },
    {
      item: (
        <>
          대표 이미지와 제목이 있는 링크들을 폴더별로 나눠,
          <br />
          쉽게 찾고 관리할 수 있어요.
        </>
      ),
      className: '',
    },
  ];

  const forthData = [
    {
      item: (
        <>
          함께 쓰면 더 강력해지는
          <br />
          공유 페이지
        </>
      ),
      className: 'font-bold mb-4 text-[28px]',
    },
    {
      item: (
        <>
          프로젝트별 공유 페이지를 만들어 팀이 함께
          <br />
          사용할 수 있는 협업 공간을 제공합니다.
          <br />
          업무, 스터디, 회의 자료에 필요한 링크를 함께
          <br />
          정리하고 공유할 수 있어요.
        </>
      ),
      className: '',
    },
  ];

  return (
    <section className="mx-auto my-[100px] flex w-full max-w-[980px] flex-col px-[24px]">
      {/* 1번째 */}
      {featureData.map((feature) => {
        return (
          <p className={`${feature.className} text-center`}>
            {feature.description}
          </p>
        );
      })}

      {/* 2번째 */}
      <div className="flex justify-center">
        <div className="mt-[138px] flex flex-col-reverse md:w-full md:flex-row md:place-content-between">
          <div className="flex flex-col justify-center">
            {secondData.map((feature) => {
              return (
                <p className={`${feature.className} text-left`}>
                  {feature.item}
                </p>
              );
            })}
          </div>
          <img
            src={확장프로그램이미지}
            className="mb-12 w-[312px] rounded-3xl object-cover md:mb-0 md:w-[466px]"
          />
        </div>
      </div>

      {/* 3번째 */}
      <div className="flex justify-center">
        <div className="mt-[138px] flex flex-col md:w-full md:flex-row md:place-content-between">
          <img
            src={폴더별정리이미지}
            className="mb-12 w-[312px] rounded-3xl object-cover md:mb-0 md:w-[466px]"
          />
          <div className="flex flex-col justify-center">
            {thirdData.map((feature) => {
              return (
                <p className={`${feature.className} text-left`}>
                  {feature.item}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4번째 */}
      <div className="flex justify-center">
        <div className="mt-[138px] flex flex-col-reverse md:w-full md:flex-row md:place-content-between">
          <div className="flex flex-col justify-center">
            {forthData.map((feature) => {
              return (
                <p className={`${feature.className} text-left`}>
                  {feature.item}
                </p>
              );
            })}
          </div>
          <img
            src={공유페이지이미지}
            className="mb-12 w-[312px] rounded-3xl object-cover md:mb-0 md:w-[466px]"
          />
        </div>
      </div>
    </section>
  );
};

export default NewSection;
