import { Link } from 'react-router-dom';
import Depth from '@/assets/common-ui-assets/BreadCrumbDepth.svg?react';
import { useMobile } from '@/hooks/useMobile';

type Crumb = {
  id: string;
  title: string;
  type: 'folder' | 'shared';
};

interface BreadcrumbProps {
  items: Crumb[];
  trimToIndex: (index: string) => void;
  resetBreadcrumbs: () => void;
}

export default function Breadcrumb({
  items,
  trimToIndex,
  resetBreadcrumbs,
}: BreadcrumbProps) {
  const isMobile = useMobile();

  return (
    <nav className={`${isMobile ? 'hidden' : 'block'}`}>
      <ol className="flex items-center">
        {/* TODO : 기본 값 depth 수정  */}
        <li>
          <Link
            to="/"
            className="p-[6px] text-[15px] font-[400] text-gray-50"
            onClick={() => resetBreadcrumbs()}
          >
            개인 페이지
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            <Depth className="text-gray-30" />
            <Link
              to={`/${item.type}/${item.id}`}
              className="p-[6px] px-[8px] py-[5px] text-[15px] font-[400] text-gray-50"
              onClick={() => trimToIndex(index.toString())}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
