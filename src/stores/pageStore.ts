import { create } from 'zustand';

interface PageStoreState {
  pageId: string;
  setPageInfo: (pageId: string) => void;
}

interface ParentsFolderIdStoreState {
  parentsFolderId: string | null;
  setParentsFolderId: (parentsFolderId: string) => void;
  parentsFolderId: string | null;
  setParentsFolderId: (parentsFolderId: string) => void;
}

export const usePageStore = create<PageStoreState>((set) => ({
  pageId: '',
  setPageInfo: (pageId: string) => set({ pageId }),
}));

export const useParentsFolderIdStore = create<ParentsFolderIdStoreState>(
  (set) => ({
    parentsFolderId: null,
    setParentsFolderId: (parentsFolderId: string) => set({ parentsFolderId }),
    setParentsFolderId: (parentsFolderId: string) => set({ parentsFolderId }),
  })
);
