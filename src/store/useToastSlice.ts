import { create } from "zustand";


type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}


export const useToastStore = create<ToastState>((set) => ({
    open: false,
    message: '',
    type: 'success',
    showToast: (message, type) =>
      set({ open: true, message, type }),
    hideToast: () => set({ open: false }),
  }));



//   const showToast = useToastStore((s) => s.showToast);
// showToast("عملیات با موفقیت انجام شد", "success");