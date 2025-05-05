
import { create } from "zustand";

type StepperState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export const useStepperStore = create<StepperState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));
