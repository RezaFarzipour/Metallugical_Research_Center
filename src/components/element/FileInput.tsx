import { TbArrowBarToDown } from "react-icons/tb";
import { FieldErrors } from "react-hook-form";
import { Input } from "@heroui/react";

interface FileInputProps {
  label: string;
  name: string;
  value?: string;
  dir?: "rtl" | "ltr";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  className?: string;
  errors?: FieldErrors;
}

function FileInput({
  label,
  name,
  dir = "rtl",
  onChange,
  isRequired,
  className,
  errors,
  ...rest
}: FileInputProps) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={`cursor-pointer border-2 ${
          hasError ? "border-red-500" : "border-primary-500"
        } rounded-lg px-3 py-2 text-primary-500 flex items-center justify-center gap-x-2 ${className}`}
      >
        {label}
        <TbArrowBarToDown className="w-5 h-5" />
        <Input
          id="file-upload"
          type="file"
          className="sr-only hidden"
          name={name}
          dir={dir}
          onChange={onChange}
          required={isRequired}
          {...rest}
        />
      </label>

      {hasError && (
        <span className="text-red-600 block text-xs mt-2">
          {errorMessages?.message}
        </span>
      )}
    </>
  );
}

export default FileInput;
