export type PageItemSearchRequest = {
  pageId: string;
  keyword: string;
  searchType: 'TITLE' | 'CONTENT';
};

export type PageItemSearchResponse = {
  directorySimpleResponses: Array<{
    folderId: string;
    folderName: string;
    isFavorite: boolean;
  }>;
  siteSimpleResponses: Array<{
    linkId: string;
    linkName: string;
    linkUrl: string;
    isFavorite: boolean;
    faviconUrl: string;
  }>;
};
