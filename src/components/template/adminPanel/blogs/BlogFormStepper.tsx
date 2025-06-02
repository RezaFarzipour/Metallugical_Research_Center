"use client";
import { useBlogFormStore } from "@/store/useBlogFormStore";
import Stage1 from "./formSteps/Stage1";
import Stage2 from "./formSteps/Stage2";

export default function BlogFormStepper() {
  const { step, setStep } = useBlogFormStore();

  return (
    <>
      {step === 1 && <Stage1 />}
      {step === 2 && <Stage2 />}
    </>
  );
}
