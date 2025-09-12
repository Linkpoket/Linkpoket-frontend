export const usePageData = (folderData: any[], linkData: any[]) => {
  const folderDataLength = folderData?.length ?? 0;
  const linkDataLength = linkData?.length ?? 0;

  return {
    folderDataLength,
    linkDataLength,
  };
};
