"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFormData } from "@/schemas/phoneSchema";
import SendOtpForm from "../module/SendOtpForm";
import CheckOtpForm from "../module/CheckOtpForm";

const RESEND_TIME = 90;

const SigninPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [time, setTime] = useState<number>(RESEND_TIME);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const router = useRouter();

  const sendOtpHandler = async (data: PhoneFormData) => {
    setPhoneNumber(data.phone);
    setStep(2);
  };

  const checkOtpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    const timer =
      time > 0 ? setInterval(() => setTime((prev) => prev - 1), 1000) : null;
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <SendOtpForm onSubmit={sendOtpHandler} />;

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
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full sm:max-w-sm">{renderSteps()}</div>
      </div>
    </>
  );
};

export default SigninPage;
