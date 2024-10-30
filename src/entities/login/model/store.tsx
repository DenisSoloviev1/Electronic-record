import { create } from "zustand";
import { Roles, RolesDict } from "@/shared/types";

interface ILoginState {
  isLogin: boolean;
  role: Roles; // Тип роли основывается на RolesDict
  setRole: (newRole: Roles) => void; // Используем тип Roles для функции
}

export const useLoginStore = create<ILoginState>((set) => ({
  isLogin: false,
  role: '' as Roles,
  // role: RolesDict.ADMIN,
  setRole: (newRole: Roles) => set({ isLogin: true, role: newRole }),
}));
