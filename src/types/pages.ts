export interface CreateSharedPageData {
  pageTitle: string;
  pageDescription?: string;
  pageType: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface JoinedPageData {
  pageId: string;
  pageTitle: string;
  pageType: string;
}

export interface PageParamsData {
  pageId: number;
  commandType: string;
}

export interface DeleteSharedPageData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
}

export interface UpdatePageTitleData {
  baseRequest: {
    pageId: number;
    commandType: 'EDIT';
  };
  pageTitle: string;
}

export interface UpdatePageDescriptionData {
  baseRequest: {
    pageId: number;
    commandType: 'EDIT';
  };
  pageDescription: string;
}
