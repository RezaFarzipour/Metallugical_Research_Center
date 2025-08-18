// store/useReservationSource.ts
import { create } from "zustand";

type ReservationSource = "course" | "service" | null;

interface ReservationState {
  source: ReservationSource;
  setSource: (source: ReservationSource) => void;
  clearSource: () => void;
}

export const useReservationSource = create<ReservationState>((set) => ({
  source: null,
  setSource: (source) => set({ source }),
  clearSource: () => set({ source: null }),
}));
