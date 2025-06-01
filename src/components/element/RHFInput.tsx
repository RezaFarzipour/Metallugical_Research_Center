"use client";

import { Input } from "@heroui/react";
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

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

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  type: string;
  dir: "ltr" | "rtl";
  name: Path<T>;
}

const RHFInput = <T extends FieldValues>({
  register,
  errors,
  label,
  type,
  dir,
  name,
}: InputProps<T>) => {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={inputStyles.wrapper}>
      <Input
        {...register(name)}
        type={type}
        label={label}
        dir={dir}
        variant="underlined"
        isRequired
        isInvalid={!!error}
        errorMessage={errorMessage}
        classNames={{
          inputWrapper: [
            ...inputStyles.inputWrapper,
            ...(error ? inputStyles.error : []),
          ],
        }}
      />
      {/* {errorMessage && (
        <p className={inputStyles.errorMessage.join(" ")}>{errorMessage}</p>
      )} */}
    </div>
  );
};

export default RHFInput;
