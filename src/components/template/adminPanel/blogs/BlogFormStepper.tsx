"use client";
import { useBlogFormStore } from "@/store/useBlogFormStore";
import Stage1 from "./blogAction/Stage1";
import Stage2 from "./blogAction/Stage2";
import { Button } from "@heroui/button";

export default function BlogFormStepper() {
  const { step, setStep } = useBlogFormStore();

  return (
    <>
      {step === 1 && <Stage1 />}
      {step === 2 && <Stage2 />}

      <div style={{ marginTop: "1rem" }}>
        {step > 1 && (
          <Button onPress={() => setStep(step - 1)}>مرحله قبل</Button>
        )}
      </div>
    </>
  );
}
