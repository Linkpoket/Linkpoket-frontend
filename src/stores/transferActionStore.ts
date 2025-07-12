import { create } from 'zustand';

type TransferActionStore = {
  transferFolder: (receiverEmail: string, directoryId: string) => void;
  setTransferFolder: (
    fn: (receiverEmail: string, directoryId: string) => void
  ) => void;
};

export const useTransferActionStore = create<TransferActionStore>((set) => ({
  transferFolder: () => {},
  setTransferFolder: (fn) => set({ transferFolder: fn }),
}));
