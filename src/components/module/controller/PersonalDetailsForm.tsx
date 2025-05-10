import RHFInput from "@/components/element/RHFInput";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface PersonalDetailsFormProps {
  register: UseFormRegister<PersonalRegisterFormData>;
  errors: FieldErrors<PersonalRegisterFormData>;

}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  register,
  errors,

}) => {
  return (
    <div>
      <RHFInput<PersonalRegisterFormData>
        register={register}
        errors={errors}
        label="نام"
        type="text"
        dir="rtl"
        name="first_name"
      />
      <RHFInput<PersonalRegisterFormData>
        register={register}
        errors={errors}
        label="نام خانوادگی"
        type="text"
        dir="rtl"
        name="last_name"
      />
      <RHFInput<PersonalRegisterFormData>
        register={register}
        errors={errors}
        label="ایمیل"
        type="email"
        dir="rtl"
        name="email"
      />
    </div>
  );
};

export default PersonalDetailsForm;
