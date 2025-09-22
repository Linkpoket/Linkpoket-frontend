import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PageStoreState {
  pageId: string;
  setPageInfo: (pageId: string) => void;
}

interface ParentsFolderIdStoreState {
  parentsFolderId: string | null;
  setParentsFolderId: (parentsFolderId: string) => void;
}

export const usePageStore = create<PageStoreState>()(
  persist(
    (set) => ({
      pageId: '',
      setPageInfo: (pageId: string) => set({ pageId }),
    }),
    {
      name: 'page-store', // localStorage에 저장될 키 이름
    }
  )
);

export const useParentsFolderIdStore = create<ParentsFolderIdStoreState>()(
  persist(
    (set) => ({
      parentsFolderId: null,
      setParentsFolderId: (parentsFolderId: string) => set({ parentsFolderId }),
    }),
    {
      name: 'parents-folder-store', // localStorage에 저장될 키 이름
    }
  )
);
