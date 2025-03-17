"use client";

import { Input } from "@heroui/react";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

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

interface PhoneInputProps<T extends object> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  type: string;
  dir: "ltr" | "rtl";
  name: keyof T;
}

const RHFInput = <T extends object>({
  register,
  errors,
  label,
  type,
  dir,
  name,
}: PhoneInputProps<T>) => {
  return (
    <div className={inputStyles.wrapper}>
      <Input
        {...register(name)}
        type={type}
        label={label}
        dir={dir}
        variant="underlined"
        classNames={{
          inputWrapper: [
            ...inputStyles.inputWrapper,
            errors[name] && inputStyles.error,
          ].filter(Boolean),
        }}
        autoFocus
      />
      {errors[name] && (
        <p className={inputStyles.errorMessage.join(" ")}>
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
export default RHFInput;
