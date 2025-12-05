import { create } from 'zustand';

type ModalStore = {
  isLinkModalOpen: boolean;
  openLinkModal: () => void;
  closeLinkModal: () => void;
  isFolderModalOpen: boolean;
  openFolderModal: () => void;
  closeFolderModal: () => void;
  isFileModalOpen: boolean;
  openFileModal: () => void;
  closeFileModal: () => void;
  isTransferFolderModalOpen: boolean;
  openTransferFolderModal: () => void;
  closeTransferFolderModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isLinkModalOpen: false,
  openLinkModal: () =>
    set({
      isLinkModalOpen: true,
      isFolderModalOpen: false,
      isFileModalOpen: false,
    }),
  closeLinkModal: () => set({ isLinkModalOpen: false }),
  isFolderModalOpen: false,
  openFolderModal: () =>
    set({
      isFolderModalOpen: true,
      isLinkModalOpen: false,
      isFileModalOpen: false,
    }),
  closeFolderModal: () => set({ isFolderModalOpen: false }),
  isFileModalOpen: false,
  openFileModal: () =>
    set({
      isFileModalOpen: true,
      isLinkModalOpen: false,
      isFolderModalOpen: false,
    }),
  closeFileModal: () => set({ isFileModalOpen: false }),
  isTransferFolderModalOpen: false,
  openTransferFolderModal: () => set({ isTransferFolderModalOpen: true }),
  closeTransferFolderModal: () => set({ isTransferFolderModalOpen: false }),
}));
