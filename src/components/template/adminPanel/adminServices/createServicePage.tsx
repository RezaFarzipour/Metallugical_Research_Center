"use client";
import FirstStepAction from "@/components/module/panelAction/serviceAction/FirstStepAction";
import SecondStepAction from "@/components/module/panelAction/serviceAction/SecondStepAction";
import React, { useState } from "react";

const CreateServiceWizard = () => {
  const [step, setStep] = useState(1);
  const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);

  return (
    <>
      {step === 1 && (
        <FirstStepAction
          setStep={setStep}
          setCreatedServiceId={setCreatedServiceId}
        />
      )}
      {step === 2 && createdServiceId && (
        <SecondStepAction serviceId={createdServiceId} setStep={setStep} />
      )}
    </>
  );
};

export default CreateServiceWizard;
