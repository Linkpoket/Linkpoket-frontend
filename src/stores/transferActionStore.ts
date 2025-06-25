import { create } from 'zustand';

type TransferActionStore = {
  transferFolder: (receiverEmail: string, directoryId: number) => void;
  setTransferFolder: (
    fn: (receiverEmail: string, directoryId: number) => void
  ) => void;
};

export const useTransferActionStore = create<TransferActionStore>((set) => ({
  transferFolder: () => {},
  setTransferFolder: (fn) => set({ transferFolder: fn }),
}));
