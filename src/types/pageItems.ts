export type ViewType = 'grid' | 'list';

export interface PageItemProps {
  item: {
    id: string;
    title: string;
    linkUrl?: string;
  };
  isBookmark: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  view: ViewType;
}

export interface PageContentSectionProps {
  view: ViewType;
  contentData?: any;
}

export interface PageControllerSectionProps extends PageContentSectionProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'grid'>>;
}
