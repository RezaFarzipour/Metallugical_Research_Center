import { Select, SelectItem } from "@heroui/react";
import { Controller } from "react-hook-form";

function RHFSelect({ label, name, control, options, required }) {
  return (
    <div className="w-full max-w-xs">
      <Controller
        control={control}
        name={name}
        rules={{ required: "حداقل یک مورد را انتخاب کنید" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              selectedKeys={new Set(field.value || [])}
              onSelectionChange={(keys) => field.onChange(Array.from(keys))}
              label={label}
              placeholder="یک مورد را انتخاب کنید"
              selectionMode="multiple"
              variant="underlined"
              classNames={{
                base: "rounded-md px-2 py-1",
                label: "text-sm font-medium text-red-700 mb-1",
                trigger: `border-b ${
                  error ? "border-red-500" : "border-blue-200"
                } after:content-[''] after:bg-secondary-500 hover:border-blue-500 py-2 px-3 rounded-md`,
                listbox: "bg-white rounded-md mt-1 shadow-lg",
                listboxWrapper: "max-h-60 overflow-auto",
                selectorIcon: "text-gray-500",
                value: "text-sm text-gray-800",
                popoverContent: "z-50",
                errorMessage: "text-red-500 text-sm mt-1",
              }}
            >
              {options.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>

            {error && <p className="text-red-500 text-sm mt-1">شصیشیشیصشصی</p>}
          </>
        )}
      />
    </div>
  );
}

export default RHFSelect;
