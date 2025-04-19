import Logo from '@/widgets/assets/Logo.svg?react';
import Breadcrumb from './BreadCrumb';
import { HamburgerButton } from './HamburgerButton';
import { UserActions } from './UserActions';
import { AuthButtons } from './AuthButtons';

interface Props {
  isLoggedIn: boolean;
  showDepth: boolean;
  showSidebar?: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  showHeaderButton: boolean;
}

//Todo: 해당 데이터는 useQuery 활용하여 대체.
const data = {
  breadcrumb: [
    { id: '1', name: '디렉토리1' },
    { id: '2', name: '디렉토리2' },
  ],
  current: { id: '2', name: '디렉토리2' },
};
export function Header({
  isLoggedIn = true,
  showDepth = true,
  showSidebar,
  setShowSidebar,
  showHeaderButton,
}: Props) {
  return (
    // Header 1920기준 w값 1600고정 - 반응형 고려시 해당부분 수정

    <header className="border-b-gray-30 flex justify-between border-b px-[24px] py-[12px]">
      <div className="flex items-center gap-[24px]">
        {!showSidebar && setShowSidebar && (
          <HamburgerButton onClick={() => setShowSidebar(!showSidebar)} />
        )}
        <Logo className="h-[54px]" />
        {showDepth && <Breadcrumb items={data.breadcrumb} />}
      </div>
      {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
    </header>
  );
}

// 헤더 컴포넌트는 props를 활용한 조립식으로 사용.
// BreadCrumb로 전달 할 값은 이후 query 함수를 활용하여 수정 예정
// 로그인 페이지이센 LeftSidebar, logo가없고 로그인이 안되어있기에
// <Header hasSidebar={false} showDepth={false} isLoggedIn={false}/>
