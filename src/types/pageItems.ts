import { PageDetails } from './pages';
import { PageItemSearchResponse } from './search';

export type ViewType = 'grid' | 'list';

export interface ContentData {
  folders?: Array<{
    id: number;
    title: string;
  }>;
  links?: Array<{
    id: number;
    title: string;
    linkUrl?: string;
  }>;
}

export interface PageItemProps {
  item: {
    id: number;
    title: string;
    linkUrl?: string;
  };
  isBookmark: boolean;
  view: ViewType;
  pageDescription?: string;
}

export interface PageContentSectionProps {
  view: ViewType;
  contentData?: any;
  searchResult?: PageItemSearchResponse;
  pageDetails?: PageDetails;
}

export interface PageControllerSectionProps {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<'list' | 'grid'>>;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}
