"use client";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import React, { useState } from "react";
import FirstStepAction from "./formSteps/FirstStepAction";
import SecondStepAction from "./formSteps/SecondStepAction";

const CreatecoursePage = () => {
  const [step, setStep] = useState(1);
  const [createdServiceId, setCreatedServiceId] = useState<string | null>(null);

  return (
    <>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="دوره آموزشی ها"
          item2="ساخت دوره آموزشی"
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

export default CreatecoursePage;
