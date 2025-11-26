import { useLocation, useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import HomeIcon from '@/assets/widget-ui-assets/Home.svg?react';
import BookMarkIcon from '@/assets/widget-ui-assets/BookMark.svg?react';
import PersonalPageIcon from '@/assets/widget-ui-assets/PersonalPage.svg?react';

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

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: '홈',
      path: '/home',
      icon: <HomeIcon className="h-7 w-7" />,
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

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  if (!isMobile) return null;

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-9999 bg-white md:hidden">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = currentNavId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
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
