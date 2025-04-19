import { Link } from 'react-router-dom';
import Depth from '@/shared/assets/BreadCrumbDepth.svg?react';

type Directory = {
  id: string;
  name: string;
};

interface BreadcrumbProps {
  items: Directory[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav>
      <ol className="flex items-center">
        {/* TODO : 기본 값 depth 수정  */}
        <li>
          <Link
            to="/mypage"
            className="p-[6px] text-[15px] font-[400] text-gray-50"
          >
            개인 페이지
          </Link>
        </li>

        {items.map((item) => (
          <li key={item.id} className="flex items-center">
            <Depth className="text-gray-30" />
            <Link
              to={`/mypage?dir=${item.id}`}
              className="p-[6px] px-[8px] py-[5px] text-[15px] font-[400] text-gray-50"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// 받아올 데이터와 사용방법
//
//  const data = {
//     breadcrumb: [
//       { id: '1', name: '디렉토리1' },
//       { id: '2', name: '디렉토리2' },
//     ],
//     current: { id: '2', name: '디렉토리2' },
//   };

// <Breadcrumb items={data.breadcrumb} />
