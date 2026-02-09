import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService";
import type { AuthState } from "../types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => set({ accessToken: null, user: null, loading: false }),

  signUp: async (username, password, email, lastName, firstName) => {
    try {
      set({ loading: true });
      //viết API
      await authService.signUp(username, password, email, lastName, firstName);
      toast.success("Đăng ký thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký thất bại");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      await authService.signIn(username, password);
      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      get().clearState();
      await authService.signOut();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng xuất thất bại");
    } finally {
      set({ loading: false });
    }
  },
}));
