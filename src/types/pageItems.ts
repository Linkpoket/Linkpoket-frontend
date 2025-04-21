export interface PageItemProps {
  item: {
    id: string;
    title: string;
  };
  isBookmark: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  view: 'grid' | 'list';
}
