import {
  Controller,
  FieldValues,
  Path,
  Control,
  FieldErrors,
} from "react-hook-form";
import { Input } from "@heroui/react";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  type: string;
  dir: "ltr" | "rtl";
  name: Path<T>;
}

const RHFInput = <T extends FieldValues>({
  control,
  errors,
  label,
  type,
  dir,
  name,
}: InputProps<T>) => {
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;

            if (name === "price") {
              // حذف همه کاراکترهای غیرعددی
              value = value.replace(/\D/g, "");
              field.onChange(value); // مقدار خام ذخیره می‌شه
              return;
            }

            if (name === "phone") {
              // تبدیل اعداد فارسی به انگلیسی
              value = value.replace(/[۰-۹]/g, (d) =>
                String(d.charCodeAt(0) - 1776)
              );
            }

            field.onChange(value);
          };

          // نمایش مقدار فرمت‌شده برای price
          const displayValue =
            name === "price" && field.value
              ? Number(field.value).toLocaleString("en-US")
              : field.value || "";

          return (
            <Input
              {...field}
              value={displayValue}
              onChange={handleChange}
              type={type}
              label={label}
              dir={dir}
              variant="underlined"
              isRequired
              isInvalid={!!error}
              errorMessage={errorMessage}
              classNames={{
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
                  "dark:border-secondary-100",
                  ...(error
                    ? [
                        "border-red-500",
                        "focus:border-red-500",
                        "focus:ring-red-500/20",
                      ]
                    : []),
                ],
                input: [
                  "text-secondary-800",
                  "placeholder:text-secondary-600",
                  "text-default-600",
                  "placeholder:text-default-600",
                ],
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default RHFInput;
