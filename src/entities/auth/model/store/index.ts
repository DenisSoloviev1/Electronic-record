import { create } from 'zustand';
import { Roles } from '@/shared/types';

interface IAuthState {
  isAuth: boolean;
  role: Roles;
  setRole: (roleName: Roles) => void;
  resetAuth: () => void; 
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  role: '' as Roles,
  setRole: (roleName: Roles) => {
    set({ isAuth: true, role: roleName });
  },
  resetAuth: () => {
    set({ isAuth: false, role: "" as Roles });
  },
}));
