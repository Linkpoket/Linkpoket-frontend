import { useLocation, useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';

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
      id: 'personal',
      label: '개인페이지',
      path: '/',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 'bookmarks',
      label: '북마크',
      path: '/bookmarks',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ),
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
