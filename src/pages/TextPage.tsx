import FolderCard from '@/components/page-layout-ui/FolderCard';
import LinkCard from '@/components/page-layout-ui/LinkCard';
import { useState } from 'react';

export default function TextPage() {
  const [isBookmark, setIsBookmark] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <LinkCard isBookmark={isBookmark} />
      <FolderCard isBookmark={isBookmark} />
    </div>
  );
}
