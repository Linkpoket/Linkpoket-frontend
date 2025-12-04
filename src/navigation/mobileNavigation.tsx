import { useLocation, useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import BookMarkIcon from '@/assets/widget-ui-assets/BookMark.svg?react';
import PersonalPageIcon from '@/assets/widget-ui-assets/PersonalPage.svg?react';
import GridIcon from '@/assets/widget-ui-assets/GridIcon.svg?react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface MobileNavigationProps {
  onPageListMenuToggle?: () => void;
}

export default function MobileNavigation({
  onPageListMenuToggle,
}: MobileNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const isHomePage = location.pathname === '/home';

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: '홈',
      path: '/home',
      icon: <GridIcon className="h-7 w-7" />,
    },
    {
      id: 'bookmarks',
      label: '북마크',
      path: '/bookmarks',
      icon: <BookMarkIcon className="h-7 w-7" />,
    },
    {
      id: 'personal',
      label: '개인페이지',
      path: '/',
      icon: <PersonalPageIcon className="h-7 w-7" />,
    },
  ];

  const getCurrentNavId = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path.startsWith('/bookmarks')) return 'bookmarks';
    if (path === '/' || path.startsWith('/personal')) return 'personal';
    return 'home';
  };

  const currentNavId = getCurrentNavId();

  const handleNavClick = (path: string, itemId: string) => {
    // /home 페이지에서 home 아이콘(Menu 아이콘) 클릭 시 PageListMenu 토글
    if (itemId === 'home' && isHomePage && onPageListMenuToggle) {
      onPageListMenuToggle();
      return;
    }
    navigate(path);
  };

  if (!isMobile) return null;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-9999 border-t border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = currentNavId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path, item.id)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-all ${
                isActive ? 'text-black' : 'hover:text-gray-70 text-gray-50'
              }`}
              aria-label={item.label}
            >
              <div
                className={`transition-all ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {item.icon}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
