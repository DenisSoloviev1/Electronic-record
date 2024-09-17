import { create } from 'zustand';

interface ICalendarState {
  startDate: Date | string;
  setStartDate: (date: Date | string) => void;

  endDate: Date | string;
  setEndDate: (date: Date | string) => void;

  time: string;
  setTime: (time: string) => void;

  resetDateTime: () => void;

  reciptDate: string | null;
  setReciptDate: (dates: string) => void;
}

type InitStore = Pick<
  ICalendarState,
  'endDate' | 'startDate' | 'time' | 'reciptDate'
>;

const initStore: InitStore = {
  endDate: '',
  startDate: '',
  time: '',
  reciptDate: null,
};

export const useCalendarStore = create<ICalendarState>((set) => ({
  ...initStore,
  setEndDate: (date: Date | string) => {
    set({ endDate: date });
  },
  setStartDate: (date: Date | string) => {
    set({ startDate: date });
  },
  setTime: (time: string) => {
    set({ time: time });
  },
  resetDateTime: () => set(() => ({ startDate: '', time: '', endDate: '' })),
  setReciptDate: (dates: string) => set(() => ({ reciptDate: dates })),
}));
