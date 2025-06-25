import { create } from 'zustand';

type LinkActionStore = {
  deleteLink: (id: number) => void;
  setDeleteLink: (fn: (id: number) => void) => void;
};

export const useLinkActionStore = create<LinkActionStore>((set) => ({
  deleteLink: () => {},
  setDeleteLink: (fn) => set({ deleteLink: fn }),
}));
