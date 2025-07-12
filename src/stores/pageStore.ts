import { create } from 'zustand';

interface PageStoreState {
  pageId: string;
  commandType: string;
  setPageInfo: (pageId: string, commandType: string) => void;
}

interface ParentsFolderIdStoreState {
  parentsFolderId: string | null;
  setParentsFolderId: (parentsFolderId: string) => void;
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
    setParentsFolderId: (parentsFolderId: string) => set({ parentsFolderId }),
  })
);
