import { ExpiredReserveStore } from "@/types";
import { create } from "zustand";

const useExpiredReserveStore = create<ExpiredReserveStore>((set) => ({
    expiredReserveDates: [],
    setExpiredReserveDates: (data) => set({ expiredReserveDates: data }),
}));

export default useExpiredReserveStore;