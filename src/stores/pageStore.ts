import { create } from 'zustand';

interface PageStoreState {
  pageId: number;
  commandType: string;
  setPageInfo: (pageId: number, commandType: string) => void;
}

interface ParentsFolderIdStoreState {
  parentsFolderId: number;
  setParentsFolderId: (parentsFolderId: number) => void;
}

export const usePageStore = create<PageStoreState>((set) => ({
  pageId: 1,
  commandType: 'VIEW',
  setPageInfo: (pageId: number, commandType: string) =>
    set({ pageId, commandType }),
}));

export const useParentsFolderIdStore = create<ParentsFolderIdStoreState>(
  (set) => ({
    parentsFolderId: 1,
    setParentsFolderId: (parentsFolderId: number) => set({ parentsFolderId }),
  })
);
