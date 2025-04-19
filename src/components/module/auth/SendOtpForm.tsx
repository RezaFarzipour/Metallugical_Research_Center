"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneSchema, PhoneFormData } from "@/schemas/phoneSchema";
import Button from "@/components/element/Button";
import RHFInput from "@/components/element/RHFInput";
import BtnLoader from "@/components/element/BtnLoader";

interface SendOtpFormProps {
  onSubmit: (data: PhoneFormData) => void;
  loading: boolean;
}

const SendOtpForm: React.FC<SendOtpFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <p className="text-gray-700 leading-none">ورود | ثبت نام</p>
      <p className="text-gray-700 leading-none">سلام!</p>

      <RHFInput<PhoneFormData>
        register={register}
        errors={errors}
        label="شماره موبایل"
        type="tel"
        dir="ltr"
        name="phone"
      />

      <Button
        type="submit"
        variant="secondary"
        fullWidth
        className="text-center"
      >
        {loading ? <BtnLoader /> : "ارسال کد تایید"}
      </Button>
    </form>
  );
};

export default SendOtpForm;
