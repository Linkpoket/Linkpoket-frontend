export type PageItemSearchRequest = {
  pageId: number;
  keyword: string;
  searchType: string;
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
