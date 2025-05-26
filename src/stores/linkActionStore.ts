import { create } from 'zustand';

type LinkActionStore = {
  deleteLink: (id: string) => void;
  setDeleteLink: (fn: (id: string) => void) => void;
};

export const useLinkActionStore = create<LinkActionStore>((set) => ({
  deleteLink: () => {},
  setDeleteLink: (fn) => set({ deleteLink: fn }),
}));
