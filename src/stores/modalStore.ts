import { create } from 'zustand';

type ModalStore = {
  isLinkModalOpen: boolean;
  openLinkModal: () => void;
  closeLinkModal: () => void;
  isFolderModalOpen: boolean;
  openFolderModal: () => void;
  closeFolderModal: () => void;
  isTransferFolderModalOpen: boolean;
  openTransferFolderModal: () => void;
  closeTransferFolderModal: () => void;

  // for context menu
  isFolderContextMenuOpen: number | null;
  openFolderContextMenu: (id: number) => void;
  closeFolderContextMenu: () => void;
  isLinkContextMenuOpen: number | null;
  openLinkContextMenu: (id: number) => void;
  closeLinkContextMenu: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isLinkModalOpen: false,
  openLinkModal: () => set({ isLinkModalOpen: true, isFolderModalOpen: false }),
  closeLinkModal: () => set({ isLinkModalOpen: false }),
  isFolderModalOpen: false,
  openFolderModal: () =>
    set({ isFolderModalOpen: true, isLinkModalOpen: false }),
  closeFolderModal: () => set({ isFolderModalOpen: false }),
  isTransferFolderModalOpen: false,
  openTransferFolderModal: () => set({ isTransferFolderModalOpen: true }),
  closeTransferFolderModal: () => set({ isTransferFolderModalOpen: false }),

  // for context menu
  isFolderContextMenuOpen: null,
  openFolderContextMenu: (id) => set({ isFolderContextMenuOpen: id }),
  closeFolderContextMenu: () => set({ isFolderContextMenuOpen: null }),

  isLinkContextMenuOpen: null,
  openLinkContextMenu: (id) =>
    set({ isLinkContextMenuOpen: id, isFolderContextMenuOpen: null }),
  closeLinkContextMenu: () => set({ isLinkContextMenuOpen: null }),
}));
