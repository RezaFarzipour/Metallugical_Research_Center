import { Input } from "@heroui/react";
import React from "react";

type CustomInputProps = {
  label: string;
  type: string;
  name: string;
  value: string | boolean;
  placeholder: string |undefined;
  maxLength: number| undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({
  label,
  type,
  name,
  value,
  maxLength,
  placeholder,
  onChange,
}: CustomInputProps) => {
  return (
    <>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input
        placeholder={placeholder}
        maxLength={maxLength}
        variant="bordered"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        classNames={{
          input: ["bg-transparent"],
          inputWrapper: [
            "bg-transparent",
            "border",
            "border-gray-600",
            "group-data-[focus=true]:border-teal-500",
            "group-data-[focus=true]:ring-1",
            "!cursor-text",
          ],
        }}
      />
    </>
  );
};

export default CustomInput;
