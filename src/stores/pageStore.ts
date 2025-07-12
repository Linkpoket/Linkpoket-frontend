import { create } from 'zustand';

interface PageStoreState {
  pageId: string;
  commandType: string;
  setPageInfo: (pageId: string, commandType: string) => void;
}

interface ParentsFolderIdStoreState {
  parentsFolderId: number | null;
  setParentsFolderId: (parentsFolderId: number) => void;
}

export const usePageStore = create<PageStoreState>((set) => ({
  pageId: '',
  commandType: 'VIEW',
  setPageInfo: (pageId: string, commandType: string) =>
    set({ pageId, commandType }),
}));

export const useParentsFolderIdStore = create<ParentsFolderIdStoreState>(
  (set) => ({
    parentsFolderId: null,
    setParentsFolderId: (parentsFolderId: number) => set({ parentsFolderId }),
  })
);
