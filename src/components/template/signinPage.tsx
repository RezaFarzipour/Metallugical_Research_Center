"use client";
import React, { useEffect } from "react";
import SendOtpForm from "../module/auth/SendOtpForm";
import CheckOtpForm from "../module/auth/CheckOtpForm";
import PersonalRegister from "../module/auth/PersonalRegister";
import { useSigninFlow } from "../module/auth/useSigninFlow";
import { useStepperStore } from "@/store/useSteperSlice";

const SigninPage: React.FC = () => {
  const { setCurrentStep } = useStepperStore();
  const {
    step,
    setStep,
    otp,
    handleOtpChange,
    time,
    phoneNumber,
    loading,
    sendOtpHandler,
    checkOtpHandler,
    onSubmitPersonalRegister,
    checkOtpLoading,
    isPersonalRegistering,
  } = useSigninFlow();

  useEffect(() => {
    setCurrentStep(step);
  }, [step, setCurrentStep]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <SendOtpForm loading={loading} onSubmit={sendOtpHandler} />;
      case 2:
        return (
          <CheckOtpForm
            onBack={() => {
              setStep(1);
              setCurrentStep(1);
            }}
            onSubmit={checkOtpHandler}
            onChange={handleOtpChange}
            onResendOtp={() => sendOtpHandler({ phone: phoneNumber })}
            otp={otp}
            time={time}
            phoneNumber={phoneNumber}
            loading={checkOtpLoading}
          />
        );
      case 3:
        return (
          <PersonalRegister
            loading={isPersonalRegistering}
            onSubmitPersonalRegister={onSubmitPersonalRegister}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </div>
  );
};

export default SigninPage;
