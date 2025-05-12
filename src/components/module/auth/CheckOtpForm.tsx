"use client";

import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import OtpInput from "@/components/element/OtpInput";
import Button from "@/components/element/Button";
import { BtnLoader } from "@/components/element/Loader";

interface CheckOtpFormProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  phoneNumber: string;
  otp: string;
  onBack: () => void;
  time: number;
  onResendOtp: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const isCheckingOtp = false;
const CheckOtpForm: React.FC<CheckOtpFormProps> = ({
  onSubmit,
  otp,
  onBack,
  time,
  onResendOtp,
  onChange,
  phoneNumber,
}) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4">
        <HiOutlineArrowNarrowRight className="w-6 h-6 text-secondary-900/60" />
      </button>

      {phoneNumber && (
        <p className="flex items-center gap-2">
          {phoneNumber}
          <button onClick={onBack}>
            <CiEdit className="w-6 h-6 text-primary-900" />
          </button>
        </p>
      )}

      <div className="mb-4 text-secondary-800/40">
        {time > 0 ? (
          <p>{time} ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button onClick={onResendOtp}>ارسال مجدد کد؟</button>
        )}
      </div>

      <form className="space-y-8" onSubmit={onSubmit}>
        <p className="font-bold text-primary-900/40">کد تایید را وارد کنید</p>

        <div className="w-full flex justify-center flex-wrap gap-4">
          <OtpInput
            length={6}
            value={otp}
            onChange={onChange}
            autoFocus
            errorMessage="کد را کامل وارد کنید"
          />
        </div>

        <div>
          {isCheckingOtp ? (
            <BtnLoader />
          ) : (
            <Button type="submit" variant="secondary" fullWidth>
              تایید کد
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckOtpForm;
