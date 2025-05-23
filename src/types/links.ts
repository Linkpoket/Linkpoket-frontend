export type CreateLinkData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  linkName: string;
  linkUrl: string;
  directoryId: number;
  faviconUrl: string;
};
