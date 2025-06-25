import { create } from 'zustand';

interface profileModalStore {
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  isWithdrawModalOpen: boolean;
  openWithdrawModal: () => void;
  closeWithdrawModal: () => void;
}

export const useProfileModalStore = create<profileModalStore>((set) => ({
  isProfileModalOpen: false,
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
  isWithdrawModalOpen: false,
  openWithdrawModal: () => set({ isWithdrawModalOpen: true }),
  closeWithdrawModal: () => set({ isWithdrawModalOpen: false }),
}));
