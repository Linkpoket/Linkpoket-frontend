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
  isFolderContextMenuOpen: boolean;
  openFolderContextMenu: () => void;
  closeFolderContextMenu: () => void;
  isLinkContextMenuOpen: boolean;
  openLinkContextMenu: () => void;
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
  isFolderContextMenuOpen: false,
  openFolderContextMenu: () =>
    set({ isFolderContextMenuOpen: true, isLinkContextMenuOpen: false }),
  closeFolderContextMenu: () => set({ isFolderContextMenuOpen: false }),
  isLinkContextMenuOpen: false,
  openLinkContextMenu: () =>
    set({ isLinkContextMenuOpen: true, isFolderContextMenuOpen: false }),
  closeLinkContextMenu: () => set({ isLinkContextMenuOpen: false }),
}));
