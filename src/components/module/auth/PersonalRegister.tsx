"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalRegisterSchema } from "@/schemas/personalRegisterSchema";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import Loading from "../../element/Loading";
import Button from "../../element/Button";
import RHFInput from "../../element/RHFInput";

interface SendPersonalFormProps {
  onSubmit: (data: typeof personalRegisterSchema._type) => void;
}
const isCheckingInput = false;

const PersonalRegister: React.FC<SendPersonalFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalRegisterSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <RHFInput<PersonalRegisterFormData>
        register={register}
        errors={errors}
        label="نام و تام خانوادگی"
        type="text"
        dir="rtl"
        name="name"
      />

      <div className="pt-14">
        {isCheckingInput ? (
          <Loading />
        ) : (
          <Button type="submit" variant="secondary" fullWidth>
            تایید
          </Button>
        )}
      </div>

      <ul className=" mt-6 list-disc pl-5 z-30 pt-6  text-red-500 ">
        <li className=" list-none absolute bottom-[4.5rem] -right-4 font-bold">
          توجه !
        </li>
        <li>نام و نام خانوادگی باید فقط شامل حروف فارسی باشد</li>
        <li>نام و نام خانوادگی باید حداقل ۸ کاراکتر باشد</li>
        <li>نام و نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد</li>
      </ul>
    </form>
  );
};

export default PersonalRegister;
