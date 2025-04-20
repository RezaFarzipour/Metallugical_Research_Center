"use client";
import React from "react";
import SendOtpForm from "../module/auth/SendOtpForm";
import CheckOtpForm from "../module/auth/CheckOtpForm";
import PersonalRegister from "../module/auth/PersonalRegister";
import { useSigninFlow } from "../module/auth/useSigninFlow";

const SigninPage: React.FC = () => {
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
  } = useSigninFlow();

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <SendOtpForm loading={loading} onSubmit={sendOtpHandler} />;
      case 2:
        return (
          <CheckOtpForm
            onBack={() => setStep((s) => s - 1)}
            onSubmit={checkOtpHandler}
            onChange={handleOtpChange}
            onResendOtp={() => sendOtpHandler({ phone: phoneNumber })}
            otp={otp}
            time={time}
            phoneNumber={phoneNumber}
          />
        );
      case 3:
        return <PersonalRegister onSubmit={onSubmitPersonalRegister} />;
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
