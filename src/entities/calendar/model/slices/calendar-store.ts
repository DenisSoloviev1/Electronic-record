import { create } from "zustand";

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

interface IParams {
  department: number;
  division: number;
  type: number;
  date_request: string;
}

interface IChekTimeApiStore {
  params: IParams;
  setDepartment: (department: number) => void;
  setDivision: (division: number) => void;
  setType: (type: number) => void;
  setDateRequest: (date_request: string) => void;
}

type InitStore = Pick<
  ICalendarState,
  "endDate" | "startDate" | "time" | "reciptDate"
>;

const initStore: InitStore = {
  endDate: "",
  startDate: "",
  time: "",
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
  resetDateTime: () => set(() => ({ startDate: "", time: "", endDate: "" })),
  setReciptDate: (dates: string) => set(() => ({ reciptDate: dates })),
}));

export const useChekTimeApiStore = create<IChekTimeApiStore>((set) => ({
  // Инициализируем объект params с начальными значениями
  params: {
    department: 0,
    division: 0,
    type: 0,
    date_request: "",
  },

  setDepartment: (department: number) => {
    set((state) => ({
      params: { ...state.params, department },
    }));
  },

  setDivision: (division: number) => {
    set((state) => ({
      params: { ...state.params, division },
    }));
  },

  setType: (type: number) => {
    set((state) => ({
      params: { ...state.params, type },
    }));
  },

  setDateRequest: (date_request: string) => {
    set((state) => ({
      params: { ...state.params, date_request },
    }));
  },
}));