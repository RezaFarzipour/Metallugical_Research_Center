"use client";

import React from "react";

type StepperType = {
  steperDetails: { id: number; label: string }[];
  currentStep: number;
  showAllLabelsOnMobile?: boolean;
};

const Stepper = ({
  currentStep,
  steperDetails,
  showAllLabelsOnMobile = false,
}: StepperType) => {
  return (
    <div dir="ltr" className="w-full flex justify-center items-center py-6">
      <div className="w-full max-w-2xl ">
        {/* ردیف دایره‌ها و خطوط */}
        <div className="flex items-center ">
          {steperDetails.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center shrink-0 w-16 md:w-20">
                <div
                  className={`w-8 h-8 rounded-full flex justify-center items-center text-white font-bold text-center ${
                    currentStep >= step.id
                      ? "bg-secondary-500 text-white border-primary-500"
                      : "bg-default-500"
                  }`}
                >
                  {step.id}
                </div>
              </div>
              {index < steperDetails.length - 1 && (
                <div className="flex-1 h-0.5 bg-default-500 self-start mt-4" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ردیف لیبل‌ها برای دسکتاپ یا زمانی که showAllLabelsOnMobile فعال باشه */}
        <div
          className={`justify-between items-center gap-4 mt-2 ${
            showAllLabelsOnMobile ? "flex" : "hidden lg:flex"
          }`}
        >
          {steperDetails.map((step) => (
            <div key={step.id} className="w-28 text-center">
              <p className="text-xs sm:text-sm text-secondary-400 lg:text-default-200 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* نمایش لیبل فعال فقط در موبایل وقتی showAllLabelsOnMobile = false */}
        {!showAllLabelsOnMobile && (
          <div className="flex justify-center mt-2 lg:hidden">
            <p className="text-sm font-bold text-secondary-500">
              {steperDetails.find((s) => s.id === currentStep)?.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stepper;
