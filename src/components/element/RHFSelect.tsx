import { Select, SelectItem } from "@heroui/react";
import clsx from "clsx";
import { Controller } from "react-hook-form";

function RHFSelect({ label, name, control, options }) {
  return (
    <div className="w-full max-w-xs">
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) =>
            value && value.length > 0 ? true : "حداقل یک مورد را انتخاب کنید",
        }}
        render={({ field, fieldState }) => {
          const { error } = fieldState;

          return (
            <>
              <Select
                selectedKeys={new Set(field.value ?? [])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys); // به آرایه تبدیل می‌شود
                  field.onChange(selected); // ست شدن در فرم
                }}
                label={label}
                placeholder="یک مورد را انتخاب کنید"
                selectionMode="multiple"
                variant="underlined"
                isRequired
                classNames={{
                  base: "rounded-md px-2 py-1",
                  label: "text-sm font-medium text-gray-500 mb-1",
                  trigger: clsx(
                    "border-b after:content-[''] after:bg-secondary-500 hover:border-blue-500 py-2 px-3 rounded-md",
                    {
                      "border-red-500": error,
                      "border-blue-200": !error,
                    }
                  ),
                  listbox: "bg-white rounded-md mt-1 shadow-lg",
                  listboxWrapper: "max-h-60 overflow-auto",
                  selectorIcon: "text-gray-500",
                  value: "text-sm text-gray-800",
                  popoverContent: "z-50",
                }}
              >
                {options.map((option) => (
                  <SelectItem key={option.value}>{option.label}</SelectItem>
                ))}
              </Select>

              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export default RHFSelect;
