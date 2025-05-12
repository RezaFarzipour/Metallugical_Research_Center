"use client";

import React from "react";

type StepperType = {
  steperDetails: { id: number; label: string }[];
  currentStep: number;
};

const Stepper = ({ currentStep, steperDetails }: StepperType) => {
  console.log(steperDetails.length, "steperDetails");

  return (
    <div dir="ltr" className=" flex justify-center items-center py-6">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center gap-1">
          {steperDetails.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div className="flex flex-col items-center ">
                <div
                  className={`w-8 h-8 rounded-full flex justify-center items-center text-white font-bold text-center ${
                    currentStep >= step.id
                      ? "bg-secondary-500 text-white border-primary-500"
                      : "bg-default-500"
                  }`}
                >
                  {step.id}
                </div>
                <p className="mt-2 text-sm text-secondary-100  font-bold text-nowrap ">
                  {step.label}
                </p>
              </div>

              {/* Connector Line */}
              {index < steperDetails.length - 1 && (
                <div className="flex-1 h-0.5 bg-default-500 mx-1"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
