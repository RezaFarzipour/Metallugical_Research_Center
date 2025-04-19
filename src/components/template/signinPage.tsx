"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFormData } from "@/schemas/phoneSchema";
import CheckOtpForm from "../module/auth/CheckOtpForm";
import PersonalRegister from "../module/auth/PersonalRegister";
import SendOtpForm from "../module/auth/SendOtpForm";
import { checkOtp, sendOtp } from "@/services/auth";


const RESEND_TIME = 90;


const SigninPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [time, setTime] = useState<number>(RESEND_TIME);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  

  const sendOtpHandler = async (data: PhoneFormData) => {
    //setLoading(true);
    setPhoneNumber(data.phone);

    const { response, error } = await sendOtp(data.phone);

    if (response) {
     
      // setLoading(false);
     
      setStep(2);
    }
    if (error) {
     
      
      //setLoading(false);
    
    }
  };

  const checkOtpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { response, error } = await checkOtp(phoneNumber, otp);

    if (response) {
      console.log("response",response);
      
     
    } else {
      console.log('error', error);
      
    }
  };

  const onSubmitPresonalRegister = (e: React.FormEvent<HTMLFormElement>) => {
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
        return <PersonalRegister onSubmit={onSubmitPresonalRegister} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full sm:max-w-sm">
          {renderSteps()}

          
        </div>
      </div>
    </>
  );
};

export default SigninPage;
