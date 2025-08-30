import RHFInput from "@/components/element/RHFInput";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import React from "react";
import { FieldErrors, Control } from "react-hook-form";

interface PersonalDetailsFormProps {
  control: Control<PersonalRegisterFormData>;
  errors: FieldErrors<PersonalRegisterFormData>;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  control,
  errors,
}) => {
  return (
    <div>
      <RHFInput<PersonalRegisterFormData>
        control={control}
        errors={errors}
        label="نام"
        type="text"
        dir="rtl"
        name="first_name"
      />
      <RHFInput<PersonalRegisterFormData>
        control={control}
        errors={errors}
        label="نام خانوادگی"
        type="text"
        dir="rtl"
        name="last_name"
      />
      <RHFInput<PersonalRegisterFormData>
        control={control}
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
