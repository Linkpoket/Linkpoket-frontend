import { create } from 'zustand';

export type Crumb = {
  id: string;
  title: string;
  type: 'folder' | 'shared';
};

type BreadcrumbState = {
  breadcrumbs: Crumb[];
  addCrumb: (crumb: Crumb) => void;
  trimToIndex: (index: string) => void;
  resetBreadcrumbs: () => void;
};

export const useBreadcrumbStore = create<BreadcrumbState>()((set, get) => ({
  breadcrumbs: [],

  addCrumb: (crumb) => {
    const exists = get().breadcrumbs.some((c) => c.id === crumb.id);
    if (exists) return;
    set((state) => ({
      breadcrumbs: [...state.breadcrumbs, crumb],
    }));
  },

  trimToIndex: (index) =>
    set((state) => ({
      breadcrumbs: state.breadcrumbs.slice(0, Number(index) + 1),
    })),

  resetBreadcrumbs: () => set({ breadcrumbs: [] }),
}));
