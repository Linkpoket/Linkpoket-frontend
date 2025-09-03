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
  isErrorModalOpen: boolean;
  openErrorModal: () => void;
  closeErrorModal: () => void;
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
  isErrorModalOpen: false,
  openErrorModal: () => set({ isErrorModalOpen: true }),
  closeErrorModal: () => set({ isErrorModalOpen: false }),
}));
