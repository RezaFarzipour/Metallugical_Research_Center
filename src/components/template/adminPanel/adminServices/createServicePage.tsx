"use client";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";

import React, { useState } from "react";
import FirstStepAction from "./formSteps/FirstStepAction";
import SecondStepAction from "./serviceAction/SecondStepAction";

const CreateServicePage = () => {
  const [step, setStep] = useState(1);
  const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);

  return (
    <>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="ساخت سرویس"
          panelHref="/admin/services"
        />
      </div>
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

export default CreateServicePage;
