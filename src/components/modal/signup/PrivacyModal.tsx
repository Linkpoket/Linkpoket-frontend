import Modal from '@/components/common-ui/Modal';

const privacyData = [
  {
    title: '제1조(목적)',
    content: (
      <p>
        <strong>Linkpoket</strong>(이하 '서비스'라 함)는 이용자가 링크를 손쉽게
        저장·관리·공유할 수 있도록 지원하는 비상업적 서비스입니다. 본 약관은
        Linkpoket 서비스 이용과 관련하여 이용자와 Linkpoket 간의 권리·의무 및
        책임사항을 규정하는 것을 목적으로 합니다.
      </p>
    ),
  },
  {
    title: '제2조(개인정보 수집에 대한 동의 및 수집 방법)',
    content: (
      <ol className="ml-5 list-decimal space-y-2">
        <li>
          서비스는 이용자가 서비스 이용약관 및 개인정보 처리방침에 동의하는
          경우, 개인정보 수집 및 이용에 동의한 것으로 봅니다.
        </li>
        <li>
          서비스는 다음과 같은 방법으로 개인정보를 수집합니다.
          <ul className="ml-5 list-disc">
            <li>① 회원가입 및 서비스 이용 과정에서 이용자가 입력하는 정보</li>
            <li>② 고객센터 문의를 통한 정보 수집</li>
            <li>
              ③ 서비스 이용 과정에서 자동으로 생성 및 수집되는 정보(쿠키, 접속
              기록 등)
            </li>
          </ul>
        </li>
      </ol>
    ),
  },
  {
    title: '제3조(개인정보 수집 및 이용 목적)',
    content: (
      <div>
        <p>서비스는 다음의 목적을 위해 개인정보를 수집 및 이용합니다.</p>
        <table className="mt-2 w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">구분</th>
              <th className="border px-2 py-1">수집목적</th>
              <th className="border px-2 py-1">수집항목</th>
              <th className="border px-2 py-1">보유 및 이용기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">회원가입 및 관리</td>
              <td className="border px-2 py-1">
                회원 식별 및 본인확인, 서비스 제공, 문의 대응
              </td>
              <td className="border px-2 py-1">
                이메일 주소, 닉네임, 연령대, 성별, 직업
              </td>
              <td className="border px-2 py-1">회원 탈퇴 시까지</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">맞춤형 광고 제공</td>
              <td className="border px-2 py-1">
                이용자의 관심에 맞는 광고 제공
              </td>
              <td className="border px-2 py-1">
                서비스 이용기록, 접속 로그, 쿠키 정보
              </td>
              <td className="border px-2 py-1">
                수집일로부터 1년 또는 탈퇴 시까지
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2">
          ※ 법령에 따라 보존이 필요한 경우, 해당 법령에 따른 기간 동안
          보관합니다.
        </p>
      </div>
    ),
  },
  {
    title: '제4조(개인정보 자동 수집 장치 설치 및 운영)',
    content: (
      <div className="space-y-2">
        <p>
          <strong>
            1. 개인정보자동수집 장치의 설치와 운영거부에 관한 사항
          </strong>
          <br />
          회사는 서비스 이용과정에서 이용자로부터 다음과 같은 정보들이 자동으로
          생성·수집되고 다음의 목적으로 이용될 수 있습니다.
        </p>
        <p>
          <strong>2. 개인정보 자동수집정보 사용목적</strong>
          <br />
          관련법규의 준수
          <br />
          회사는 관련법규의 준수를 위해 이용자의 접속기록(로그인)을 보관할
          의무가 있습니다.
        </p>
        <p>
          <strong>3. 개인정보 자동수집안내 및 거부방법</strong>
          <br />
          개인정보 자동수집장치(쿠키 등)의 설치운영 및 거부 방법 : 아래 방법을
          통해 쿠키 등의 저장을 거부하거나 삭제할 수 있습니다.
        </p>
        <ul className="ml-5 list-disc text-sm">
          <li>
            <strong>[web]</strong>
            <br />- Internet Explorer : 도구 → 인터넷 옵션 → 개인정보
            <br />- Microsoft Edge : 설정 → 고급 설정 보기 → 쿠키
            <br />- Chrome : 설정 → 고급 → 콘텐츠 설정 → 쿠키
            <br />- Chrome 모바일 : 설정 → 방문 기록 → 삭제
            <br />- Safari 모바일 : 방문기록 및 웹사이트 데이터 지우기
            <br />- Naver 모바일 : 설정 → 캐시삭제 + 인터넷 사용 기록 → 쿠키삭제
          </li>
          <li>
            <strong>[App]</strong>
            <br />- Android : 설정 → 애플리케이션 → BagSpace → 저장공간 → 데이터
            삭제
            <br />- iOS : 설정 → 일반 → iPhone 저장 공간 → BagSpace → 앱 삭제
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: '제5조(개인정보의 제3자 제공)',
    content: (
      <p>
        서비스는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만,
        다음의 경우에는 예외적으로 개인정보를 제공할 수 있습니다.
        <br />① 이용자가 사전에 동의한 경우
        <br />② 법령에 의해 요구되는 경우
        <br />※ 현재 Linkpoket은 제3자 제공을 하지 않으며, 추후 제공이 필요한
        경우 별도로 이용자의 동의를 얻을 예정입니다.
      </p>
    ),
  },
  {
    title: '제6조(개인정보 보유 및 이용기간)',
    content: (
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">보존목적</th>
            <th className="border px-2 py-1">근거법령</th>
            <th className="border px-2 py-1">보존기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">웹사이트 접속 기록 보존</td>
            <td className="border px-2 py-1">통신비밀보호법</td>
            <td className="border px-2 py-1">3개월</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    title: '제7조(이용자 및 법정대리인의 권리와 행사 방법)',
    content: (
      <>
        <p>
          이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를
          요구할 수 있으며, 법정대리인은 만 14세 미만 이용자의 개인정보에 대해
          동일한 권리를 행사할 수 있습니다.
        </p>
        <p> ※ 요청은 서비스 내 설정 메뉴 또는 고객센터를 통해 가능합니다.</p>
      </>
    ),
  },
  {
    title: '제8조(개인정보 보호를 위한 기술적∙관리적 대책)',
    content: (
      <ol className="ml-5 list-decimal space-y-2">
        <li>
          <strong>개인정보 보호를 위한 안전조치</strong>
          <br />
          회사는 이용자의 개인정보를 안전하게 관리하여 개인정보가 분실, 도난,
          유출, 변조 또는 훼손되지 않도록 최선을 다하고 있으며 필요한 기술적,
          관리적 및 물리적 조치를 하고 있습니다.
        </li>
        <li>
          <strong>개인정보의 안전성 확보조치</strong>
          <br />
          회사는 이용자의 개인정보를 안전하게 관리하여 개인정보가 분실, 도난,
          유출, 변조 또는 훼손되지 않도록 최선을 다하고 있으며 필요한 기술적,
          관리적 및 물리적 조치를 하고 있습니다.
        </li>
        <li>
          <strong>개인정보 취급 직원의 최소화 및 교육</strong>
          <br />
          개인정보를 취급하는 직원을 최소화하고, 주기적인 개인정보 보호 교육을
          실시하여 개인정보를 관리하는 대책을 시행하고 있습니다.
        </li>
        <li>
          <strong>내부관리계획의 수립 및 시행</strong>
          <br />
          개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고
          있습니다.
        </li>
        <li>
          <strong>접속기록의 보관 및 위변조 방지</strong>
          <br />
          개인정보 침해사고 발생 시 대응이 용이하도록 개인정보처리시스템에
          접속한 기록 (웹 로그, 요약정보 등)을 최소 1년 이상 보관, 관리하고
          있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을
          사용하고 있습니다.
        </li>
        <li>
          <strong>개인정보의 암호화</strong>
          <br />
          이용자의 개인정보는 암호화 되어 저장 및 관리되고 있습니다.
        </li>
        <li>
          <strong>해킹 등에 대비한 기술적 대책</strong>
          <br />
          회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기
          위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 합니다. 또한
          외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로
          감시 및 차단하고 있습니다.
        </li>
        <li>
          <strong>개인정보에 대한 접근통제 제한</strong>
          <br />
          개인정보를 처리하는 개인정보처리시스템에 대한 접근권한의 부여, 변경,
          말소를 통하여 개인정보에 대한 접근통제를 위한 조치를 하고 있습니다.
        </li>
      </ol>
    ),
  },

  {
    title: '제9조(개인정보 보호책임자 및 문의처)',
    content: (
      <ol className="ml-5 list-decimal space-y-2">
        <li>
          서비스는 개인정보 처리와 관련된 문의, 고충처리 등을 위하여 개인정보
          보호책임자를 지정하고 있습니다.
          <ul className="mt-1 ml-5 list-disc">
            <li>① 개인정보 보호책임자: 박지현</li>
            <li>② 이메일: blackhole124594@naver.com</li>
          </ul>
        </li>
        <li>
          이용자는 개인정보 보호 관련 문의사항을 이메일을 통해 접수할 수 있으며,
          서비스는 신속하고 성실하게 답변하겠습니다.
        </li>
        <li>
          이용자는 서비스를 이용하면서 발생한 모든 개인정보보호 관련 문의,
          불만처리, 피해구제 등에 관한 사항을 개인정보보호 책임자에게 문의하실
          수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해 드릴
          것입니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제10조(권익침해에 대한 구제방법)',
    content: (
      <div className="space-y-2">
        <p>
          <strong>권익침해관련 도움받을수 있는 기관</strong>
        </p>
        <p>
          이용자의 권익침해 관련 자세한 도움이 필요하시면 아래 기관에 문의하여
          주시기 바랍니다.
        </p>
        <ol className="ml-5 list-decimal space-y-2 text-sm">
          <li>
            <strong>개인정보 침해신고센터 (한국인터넷진흥원 운영)</strong>
            <ul className="ml-4 list-disc">
              <li>소관업무: 개인정보 침해사실 신고, 상담 신청</li>
              <li>
                홈페이지:{' '}
                <a
                  href="http://privacy.kisa.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy.kisa.or.kr
                </a>
              </li>
              <li>전화: (국번없이) 118</li>
              <li>
                주소: (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층
                개인정보침해신고센터
              </li>
            </ul>
          </li>
          <li>
            <strong>개인정보 분쟁조정위원회</strong>
            <ul className="ml-4 list-disc">
              <li>
                소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
              </li>
              <li>
                홈페이지:{' '}
                <a
                  href="http://www.kopico.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.kopico.go.kr
                </a>
              </li>
              <li>전화: (국번없이) 1833-6972</li>
              <li>
                주소: (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층
              </li>
            </ul>
          </li>
          <li>
            <strong>대검찰청 사이버범죄수사단</strong>
            <ul className="ml-4 list-disc">
              <li>전화: 02-3480-3573</li>
              <li>
                홈페이지:{' '}
                <a
                  href="http://www.spo.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.spo.go.kr
                </a>
              </li>
            </ul>
          </li>
          <li>
            <strong>경찰청 사이버안전국</strong>
            <ul className="ml-4 list-disc">
              <li>전화: 182</li>
              <li>
                홈페이지:{' '}
                <a
                  href="http://cyberbureau.police.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cyberbureau.police.go.kr
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    ),
  },
  {
    title: '제11조(개인정보 처리방침 변경)',
    content: (
      <p>
        본 개인정보 처리방침은 2025년 6월 1일부터 적용됩니다. 법령이나 서비스
        정책 변경 시, 사전에 공지 후 변경사항을 적용합니다.
      </p>
    ),
  },
];

export const PrivacyModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <p className="text-lg font-bold">개인정보 처리방침</p>
      </Modal.Header>
      <Modal.Body className="max-h-[70vh] space-y-4 overflow-y-auto text-sm text-gray-700">
        {privacyData.map(({ title, content }) => (
          <section key={title}>
            <h2 className="mb-1 text-base font-semibold">{title}</h2>
            {content}
          </section>
        ))}
        <p className="mt-8 text-xs text-gray-500">
          본 방침은 2025년 6월 1일부터 적용됩니다.
        </p>
      </Modal.Body>
    </Modal>
  );
};
