import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface SearchState {
  searchKeyword: string;
  searchResult: any;
  isSearching: boolean;
  setSearchKeyword: (keyword: string) => void;
  setSearchResult: (result: any) => void;
  setIsSearching: (isSearching: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  subscribeWithSelector((set) => ({
    searchKeyword: '',
    searchResult: null,
    isSearching: false,

    setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
    setSearchResult: (result) => set({ searchResult: result }),
    setIsSearching: (isSearching) => set({ isSearching }),

    clearSearch: () =>
      set({
        searchKeyword: '',
        searchResult: null,
        isSearching: false,
      }),
  }))
);
