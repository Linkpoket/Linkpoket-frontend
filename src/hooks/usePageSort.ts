import { useState } from 'react';

export const usePageSort = () => {
  const [sortType, setSortType] = useState<string>('기본순');

  const handleSort = (selectedSortType: string) => {
    setSortType(selectedSortType);
  };

  return {
    sortType,
    handleSort,
  };
};
