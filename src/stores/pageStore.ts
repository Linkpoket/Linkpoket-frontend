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
      name: 'page-store',
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
      name: 'parents-folder-store',
    }
  )
);
interface FileListViewStoreState {
  showFilesOnly: boolean;
  toggleFileListView: () => void;
  setShowFilesOnly: (show: boolean) => void;
}

export const useFileListViewStore = create<FileListViewStoreState>((set) => ({
  showFilesOnly: false,
  toggleFileListView: () =>
    set((state) => ({ showFilesOnly: !state.showFilesOnly })),
  setShowFilesOnly: (show: boolean) => set({ showFilesOnly: show }),
}));
