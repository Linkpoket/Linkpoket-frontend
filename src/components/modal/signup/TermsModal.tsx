import Modal from '@/components/common-ui/Modal';

const termsData = [
  {
    title: '제1조(목적)',
    content: (
      <p>
        본 약관은 프로젝트 팀 "링크포켓"(이하 "운영팀")가 제공하는 링크 관리 및
        공유 서비스 "Linkpoket"(이하 "서비스")의 이용과 관련하여, 운영팀과
        이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
      </p>
    ),
  },
  {
    title: '제2조(정의)',
    content: (
      <ol className="list-inside list-decimal space-y-1">
        <li>
          "서비스"란 운영팀이 제공하는 링크 수집, 관리, 공유 기능을 포함한 웹
          기반 플랫폼을 의미합니다.
        </li>
        <li>
          "비회원"이란 회원으로 가입하지 않고, 운영팀이 제공하는 일부 서비스를
          제한적으로 이용하는 자를 말합니다.
        </li>
        <li>
          "회원"이란 서비스에 가입하여 운영팀과 이용계약을 체결한 자를
          의미합니다.
        </li>
        <li>
          "개인 페이지"란 회원이 개인적으로 링크를 관리하는 공간을 의미합니다.
        </li>
        <li>
          "공유 페이지"란 회원이 다른 이용자와 함께 링크를 관리하고 공유하는
          공간을 의미합니다.
        </li>
        <li>
          "공개 URL"란 회원이 공유 페이지를 외부에 공개하기 위해 생성하는 고유한
          웹 주소를 의미합니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제3조(약관의 명시 및 변경)',
    content: (
      <ol className="list-inside list-decimal space-y-1">
        <li>
          운영팀은 본 약관의 내용을 서비스 초기 화면에 게시하거나 기타의
          방법으로 회원에게 공지하여 효력을 발생합니다.
        </li>
        <li>
          운영팀은 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을
          변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지함으로써
          효력을 발생합니다.
        </li>
        <li>
          회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할
          수 있습니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제4조(이용계약의 체결)',
    content: (
      <ol className="list-inside list-decimal space-y-1">
        <li>
          이용계약은 회원이 본 약관에 동의하고 회원가입을 완료함으로써
          체결됩니다.
        </li>
        <li>
          회원가입 시 회원은 정확하고 최신의 정보를 제공해야 하며, 정보 변경 시
          즉시 수정해야 합니다.
        </li>
        <li>
          운영팀은 다음 각 호에 해당하는 경우 이용계약을 거절하거나 해지할 수
          있습니다:
          <ul className="ml-4 list-inside list-disc">
            <li>허위 정보를 기재한 경우</li>
            <li>타인의 명의를 도용한 경우</li>
            <li>서비스의 목적에 반하는 행위를 한 경우</li>
          </ul>
        </li>
      </ol>
    ),
  },
  {
    title: '제5조(서비스의 제공 및 변경)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          운영팀은 다음과 같은 서비스를 제공합니다:
          <ul className="mt-1 ml-5 list-disc">
            <li>개인 및 공유 링크 페이지 생성 및 관리 기능</li>
            <li>URL 링크의 등록, 수정, 삭제, 정렬 기능</li>
            <li>키워드 및 카테고리별 링크 분류 기능</li>
            <li>
              공유 페이지의 공개 URL 생성 및 관리 기능:
              <ul className="ml-5 list-disc">
                <li>
                  회원은 공유 페이지의 "공개 URL 생성" 옵션을 활성화할 수
                  있습니다.
                </li>
                <li>
                  회원은 공유 설정을 통해 공개 URL을 생성할 수 있으며, 생성된
                  URL은 서버에 저장됩니다.
                </li>
                <li>
                  해당 URL을 전달받은 이용자는 별도의 로그인 없이 페이지를
                  조회(열람)할 수 있습니다.
                </li>
              </ul>
            </li>
            <li>기타 운영팀이 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
          </ul>
        </li>
        <li>
          운영팀은 서비스의 개선을 위해 서비스의 일부 또는 전부를 수정, 중단,
          변경할 수 있으며, 주요 변경사항은 사전에 공지합니다.
        </li>
        <li>
          운영팀은 서비스의 전부 또는 일부를 무료로 제공할 수 있으며, 향후
          별도의 고지를 통해 일부에 대해 유료로 전환할 수 있습니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제6조(서비스 이용의 제한 및 중지)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          운영팀은 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부를
          제한하거나 중지할 수 있습니다:
          <ul className="ml-5 list-disc">
            <li>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
            <li>
              전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를
              중지했을 경우
            </li>
            <li>기타 불가항력적 사유가 있는 경우</li>
          </ul>
        </li>
        <li>
          운영팀은 제1항의 규정에 의하여 서비스의 이용을 제한하거나 중지한
          때에는 그 사유 및 제한기간 등을 지체 없이 회원에게 알려야 합니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제7조(회원의 의무)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          회원은 다음 행위를 하여서는 안 됩니다:
          <ul className="ml-5 list-disc">
            <li>타인의 정보 도용</li>
            <li>서비스 운영을 방해하는 행위</li>
            <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
            <li>공공질서 및 미풍양속에 반하는 행위</li>
            <li>범죄와 결부된다고 객관적으로 판단되는 행위</li>
            <li>기타 관계법령에 위배되는 행위</li>
          </ul>
        </li>
        <li>
          회원은 관계법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한
          주의사항, 운영팀이 통지하는 사항 등을 준수하여야 하며, 기타 운영팀의
          업무에 방해되는 행위를 하여서는 안 됩니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제8조(게시물의 관리)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          회원이 등록한 링크 및 게시물은 회원 본인의 책임 하에 관리됩니다.
        </li>
        <li>
          운영팀은 다음 각 호에 해당하는 게시물을 사전 통지 없이 삭제하거나
          노출을 제한할 수 있습니다:
          <ul className="ml-5 list-disc">
            <li>불법적이거나 타인의 권리를 침해하는 경우</li>
            <li>사회질서에 반하는 경우</li>
            <li>서비스 운영을 방해하는 경우</li>
          </ul>
        </li>
        <li>
          운영팀은 게시물의 삭제 또는 노출 제한 조치에 대해 회원에게 사전 또는
          사후에 통지합니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제9조(지적재산권)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          서비스에 대한 저작권 및 지적재산권은 운영팀에 귀속됩니다. 단, 회원이
          서비스 내에 게시한 콘텐츠에 대한 저작권은 해당 회원에게 귀속됩니다.
        </li>
        <li>
          회원은 서비스를 이용함으로써 얻은 정보를 운영팀의 사전 승낙 없이 복제,
          송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나
          제3자에게 이용하게 하여서는 안 됩니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제10조(개인정보 보호)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          운영팀은 회원의 개인정보를 관련 법령에 따라 보호하며, 개인정보의 수집,
          이용, 보관, 삭제에 관한 사항은 별도의 개인정보처리방침에 따릅니다.
        </li>
        <li>
          운영팀은 회원의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
        </li>
        <li>더 자세한 내용은 개인정보 처리방침을 확인해 주세요.</li>
      </ol>
    ),
  },
  {
    title: '제11조(광고 및 홍보)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          운영팀은 서비스의 운영을 위해 자체 안내(서비스 개선, 이벤트 홍보) 및
          상업적 배너 광고를 게재할 수 있습니다.
        </li>
        <li>
          회원은 광고 수신에 동의하지 않을 권리가 있으며, 수신 거부 방법은
          개인정보처리방침에 따릅니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제12조(계약 해지 및 탈퇴)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          회원은 언제든지 탈퇴를 요청할 수 있으며, 운영팀은 즉시 탈퇴를
          처리합니다.
        </li>
        <li>
          탈퇴 시 회원의 데이터는 관련 법령 및 개인정보처리방침에 따라
          처리됩니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제13조(면책조항)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          운영팀은 천재지변, 불가항력적 사유로 인한 서비스 제공 불가에 대해서는
          책임을 지지 않습니다.
        </li>
        <li>
          운영팀은 회원이 등록한 링크 및 게시물의 내용에 대해 책임지지 않습니다.
        </li>
        <li>
          운영팀은 회원 상호 간 또는 회원과 제3자 간에 서비스를 매개로 하여
          발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할
          책임도 없습니다.
        </li>
      </ol>
    ),
  },
  {
    title: '제14조(분쟁 해결)',
    content: (
      <ol className="ml-5 list-decimal">
        <li>
          서비스 이용과 관련하여 운영팀과 회원 간에 발생한 분쟁은 원칙적으로
          상호 협의하여 해결합니다.
        </li>
        <li>
          협의가 불가능할 경우, 관할 법원은 대한민국 서울중앙지방법원으로
          합니다.
        </li>
      </ol>
    ),
  },
];

export const TermsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <p className="text-lg font-bold">Linkpoket 서비스 이용약관</p>
      </Modal.Header>
      <Modal.Body className="max-h-[70vh] space-y-4 overflow-y-auto text-sm text-gray-700">
        {termsData.map(({ title, content }) => (
          <section key={title}>
            <h2 className="mb-1 text-base font-semibold">{title}</h2>
            {content}
          </section>
        ))}
        <p className="mt-8 text-xs text-gray-500">
          본 약관은 2025년 6월 1일부터 적용됩니다.
        </p>
      </Modal.Body>
    </Modal>
  );
};
