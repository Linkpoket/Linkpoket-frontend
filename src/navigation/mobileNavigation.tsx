import { useLocation, useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import PersonalPageActive from '@/assets/widget-ui-assets/PersonalPageActive.svg?react';
import BookMarkActive from '@/assets/widget-ui-assets/BookMarkActive.svg?react';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

export default function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();

  // 네비게이션 아이템들
  const navItems: NavItem[] = [
    {
      id: 'personal',
      label: '개인페이지',
      path: '/',
      icon: <PersonalPageActive />,
    },
    {
      id: 'bookmarks',
      label: '북마크',
      path: '/bookmarks',
      icon: <BookMarkActive />,
    },
  ];

  const getCurrentNavId = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/personal')) return 'personal';
    if (path.startsWith('/bookmarks')) return 'bookmarks';
    return 'personal';
  };

  const currentNavId = getCurrentNavId();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  // 모바일이 아니면 렌더링하지 않음
  if (!isMobile) return null;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = currentNavId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                isActive ? 'text-[#2563eb]' : 'hover:text-gray-70 text-gray-50'
              }`}
              aria-label={item.label}
            >
              <div
                className={`transition-colors ${isActive ? 'text-[#2563eb]' : 'text-gray-50'}`}
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
