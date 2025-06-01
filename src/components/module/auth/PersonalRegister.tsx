"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalRegisterSchema } from "@/schemas/personalRegisterSchema";
import Button from "../../element/Button";
import PersonalDetailsForm from "../controller/PersonalDetailsForm";
import { BtnLoader } from "@/components/element/Loader";

interface SendPersonalFormProps {
  onSubmitPersonalRegister: (data: typeof personalRegisterSchema._type) => void;
  loading: boolean;
}

const PersonalRegister: React.FC<SendPersonalFormProps> = ({
  onSubmitPersonalRegister,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalRegisterSchema),
    mode: "onTouched",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitPersonalRegister)}
      className="relative"
    >
      <PersonalDetailsForm register={register} errors={errors} />

      <div className="pt-14">
        <Button type="submit" variant="primary" fullWidth>
          {loading ? <BtnLoader /> : " تایید"}
        </Button>
      </div>
    </form>
  );
};

export default PersonalRegister;
