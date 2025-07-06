import Logo from '@/assets/widget-ui-assets/Logo.svg?react';
import { HamburgerButton } from './HamburgerButton';
import { UserActions } from './UserActions';
import { AuthButtons } from './AuthButtons';
import { useMobile } from '@/hooks/useMobile';
import { Link } from 'react-router-dom';
import { SearchBar } from '../common-ui/SearchBar';
interface Props {
  isLoggedIn: boolean;
  showDepth: boolean;
  showSidebar?: boolean;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  showHeaderButton: boolean;
}

//Todo: 해당 데이터는 useQuery 활용하여 대체.

export function Header({
  isLoggedIn = true,
  setShowSidebar,
  showHeaderButton,
}: Props) {
  const isMobile = useMobile();

  return (
    // Header 1920기준 w값 1600고정 - 반응형 고려시 해당부분 수정

    <header className="border-b-gray-10 flex h-[62px] justify-between border-b px-[24px] py-[12px]">
      <div className="flex items-center gap-[24px]">
        {isMobile && setShowSidebar && (
          <HamburgerButton onClick={() => setShowSidebar(true)} />
        )}
        <Link to="/">
          <Logo className="h-[24px]" />
        </Link>
      </div>
      <div className="flex items-center gap-[24px]">
        <SearchBar />
        {showHeaderButton && (isLoggedIn ? <UserActions /> : <AuthButtons />)}
      </div>
    </header>
  );
}

// 헤더 컴포넌트는 props를 활용한 조립식으로 사용.
// BreadCrumb로 전달 할 값은 이후 query 함수를 활용하여 수정 예정
// 로그인 페이지이센 LeftSidebar, logo가없고 로그인이 안되어있기에
// <Header hasSidebar={false} showDepth={false} isLoggedIn={false}/>
