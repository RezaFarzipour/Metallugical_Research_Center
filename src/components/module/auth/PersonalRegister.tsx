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
        label="نام "
        type="text"
        dir="rtl"
        name="first_name"
      />
      <RHFInput<PersonalRegisterFormData>
        register={register}
        errors={errors}
        label="  تام خانوادگی"
        type="text"
        dir="rtl"
        name="last_name"
      />

      <RHFInput<PersonalRegisterFormData>
        register={register}
        errors={errors}
        label="ایمبل "
        type="email"
        dir="rtl"
        name="email"
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
    </form>
  );
};

export default PersonalRegister;
