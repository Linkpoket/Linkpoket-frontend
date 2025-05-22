import { create } from 'zustand';

interface PageStoreState {
  pageId: number;
  commandType: string;
  setPageInfo: (pageId: number, commandType: string) => void;
}

export const usePageStore = create<PageStoreState>((set) => ({
  pageId: 1,
  commandType: 'VIEW',
  setPageInfo: (pageId: number, commandType: string) =>
    set({ pageId, commandType }),
}));
