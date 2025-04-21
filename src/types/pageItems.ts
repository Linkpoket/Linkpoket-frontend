export interface PageItemProps {
  item: {
    id: string;
    title: string;
  };
  view: 'grid' | 'list';
}
