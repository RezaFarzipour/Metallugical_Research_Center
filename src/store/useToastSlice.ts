import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastState {
  open: boolean;
  message: string | undefined;
  type: ToastType;
  persistent: boolean;
  duration: number; // مدت زمان بسته شدن خودکار
  showToast: (
    message: string | undefined,
    type?: ToastType,
    persistent?: boolean,
    duration?: number
  ) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  open: false,
  message: "",
  type: "success",
  persistent: false,
  duration: 3000, // پیشفرض ۳ ثانیه
  showToast: (message, type = "success", persistent = false, duration = 3000) => {
    set({ open: true, message, type, persistent, duration });

    if (!persistent) {
      setTimeout(() => {
        const state = get();
        if (!state.persistent) set({ open: false });
      }, duration);
    }
  },
  hideToast: () => set({ open: false, persistent: false }),
}));

// خروجی برای استفاده راحت
export const showToast = (
  message: string | undefined,
  type: ToastType = "success",
  persistent = false,
  duration = 3000
) => useToastStore.getState().showToast(message, type, persistent, duration);

export const hideToast = () => useToastStore.getState().hideToast();
