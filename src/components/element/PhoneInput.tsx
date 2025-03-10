import { Input } from "@heroui/react";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PhoneFormData } from "@/schemas/phoneSchema";

const inputStyles = {
  inputWrapper: [
    "bg-transparent",
    "transition-colors",
    "data-[hover=true]:border-secondary-300",
    "border-secondary-100",

    "after:content-['']",
    "after:rounded-full",
    "after:bg-secondary-500",
    "after:transition",
    "after:!duration-500",
    // "hover:after:scale-150",
    // dark theme
    "dark:border-secondary-100",
  ],
  input: [
    "text-secondary-800",
    "placeholder:text-secondary-600",
    // dark theme
    "text-default-600",
    "placeholder:text-default-600",
  ],
  error: ["border-red-500", "focus:border-red-500", "focus:ring-red-500/20"],
  wrapper: "relative",
  errorMessage: ["mt-1", "text-sm", "text-red-500"],
};

interface PhoneInputProps {
  register: UseFormRegister<PhoneFormData>;
  errors: FieldErrors<PhoneFormData>;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ register, errors }) => {
  return (
    <div className={inputStyles.wrapper}>
      <Input
        {...register("phone")}
        type="tel"
        label="شماره موبایل"
        dir="ltr"
        variant="underlined"
        classNames={{
          inputWrapper: [
            ...inputStyles.inputWrapper,
            errors.phone && inputStyles.error,
          ].filter(Boolean),
        }}
        autoFocus
      />
      {errors.phone && (
        <p className={inputStyles.errorMessage.join(" ")}>
          {errors.phone.message}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
