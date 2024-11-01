import { create } from 'zustand';
import { Roles } from '@/shared/types';

interface IAuthState {
  isAuth: boolean;
  role: Roles;
  userName:  string;
  setUser: (user: string) => void;
  setRole: (roleName: Roles) => void;
  setAuthStatus: (authStatus: boolean) => void;
  resetAuth: () => void; 
}

const initialAuth = localStorage.getItem("authToken") ? true : false;
const initialRole = (localStorage.getItem("userRole") as Roles) || "";

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: initialAuth,
  role: initialRole,
  userName: "",
  setUser: (newUserName: string) => {
    set({ userName: newUserName });
  },
  setRole: (newRole: Roles) => {
    localStorage.setItem("userRole", newRole); 
    set({ isAuth: true, role: newRole });
  },
  setAuthStatus: (authStatus: boolean) => set({ isAuth: authStatus }),
  resetAuth: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    set({ isAuth: false, role: "" as Roles, userName: "" });
  },
}));