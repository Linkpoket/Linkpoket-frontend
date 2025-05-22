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

export interface SelectedPageData {
  pageId: number;
  commandType: string;
}

export interface DeleteSharedPageData {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
}
