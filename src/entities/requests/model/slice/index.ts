import { create } from 'zustand';

interface UseTypesOfRequestsStore {
  selectedType: string;

  setSelectedType: (type: string) => void;
}

type InitStore = Pick<UseTypesOfRequestsStore, 'selectedType'>;

const initStore: InitStore = {
  selectedType: '',
};

export const useTypesOfRequestsStore = create<UseTypesOfRequestsStore>(
  (set) => ({
    ...initStore,
    setSelectedType: (type: string) => set({ selectedType: type }),
  }),
);
