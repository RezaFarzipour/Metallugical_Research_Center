"use client";

import React from "react";

type StepperType = {
  steperDetails: { id: number; label: string }[];
  currentStep: number;
};

const Stepper = ({ currentStep, steperDetails }: StepperType) => {
  return (
    <div dir="ltr" className="w-full flex justify-center items-center py-6">
      <div className="w-full max-w-2xl px-4 overflow-x-auto">
        {/* ردیف دایره‌ها و خطوط */}
        <div className="flex items-center gap-4">
          {steperDetails.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center shrink-0">
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
                <div className="flex-1 h-0.5 bg-default-500 self-center" />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* ردیف لیبل‌ها */}
        <div className="flex justify-between items-center gap-4 mt-2 ">
          {steperDetails.map((step) => (
            <div key={step.id} className="w-16 text-center ">
              <p className="text-xs sm:text-sm text-secondary-100 font-bold text-nowrap text-ellipsis">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
