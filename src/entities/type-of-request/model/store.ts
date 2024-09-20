import { create } from 'zustand';
import { OptionStruct } from '@/shared/ui/Select';

interface IStore {
  filter: OptionStruct;
  setFilter: (filterValue: OptionStruct) => void;
  clearFilter: () => void;
}

type InitStore = Pick<IStore, 'filter'>;

const initStore: InitStore = {
  filter: {
    name: '',
    id: 0,
  },
};

export const useTypeOfRequestsStore = create<IStore>((set) => ({
  ...initStore,

  setFilter: (filter: OptionStruct) => set(() => ({ filter: filter })),
  clearFilter: () => set(() => ({ filter: { id: 0, name: '' } })),
}));
