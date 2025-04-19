import { create } from "zustand";

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  open: boolean;
  message: string|undefined;
  type: ToastType;
  showToast: (message: string|undefined, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: '',
  type: 'success',
  showToast: (message, type = 'success') =>
    set({ open: true, message, type }),
  hideToast: () => set({ open: false }),
}));

// 👉 اینجا خروجی مستقیم برای استفاده راحت:
export const showToast = (message: string|undefined, type: ToastType = 'success') =>
  useToastStore.getState().showToast(message, type);

export const hideToast = () =>
  useToastStore.getState().hideToast();
