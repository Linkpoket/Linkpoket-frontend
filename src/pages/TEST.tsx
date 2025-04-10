import DropDown from '@/shared/ui/DropDown';
import { useState } from 'react';

export default function TEST() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div>
      <DropDown
        isHost={true}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onWithDrawPage={() => console.log('탈퇴')}
        onDeletePage={() => console.log('삭제')}
        onContact={() => console.log('문의')}
      />
    </div>
  );
}
