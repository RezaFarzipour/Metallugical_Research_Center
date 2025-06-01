import { cn } from "@/utils/cn";
import { Select, SelectItem } from "@heroui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  value: string | number;
  label: string;
}

interface RHFSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
}

function RHFSelect<T extends FieldValues>({
  label,
  name,
  control,
  options,
}: RHFSelectProps<T>) {
  return (
    <div className="w-full">
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value: (string | number)[]) =>
            value && value.length > 0 ? true : "حداقل یک مورد را انتخاب کنید",
        }}
        render={({ field, fieldState }) => {
          const { error } = fieldState;
          const errorMessage = error?.message as string | undefined;

          return (
            <>
              <Select
                selectedKeys={new Set(field.value ?? [])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys) as (string | number)[];
                  field.onChange(selected);
                }}
                label={label}
                placeholder="یک مورد را انتخاب کنید"
                selectionMode="multiple"
                variant="underlined"
                isRequired
                isInvalid={!!error}
                errorMessage={errorMessage}
                classNames={{
                  base: "rounded-md  py-1 ",
                  label: "text-sm font-medium text-gray-500 mb-1",
                  trigger: cn(
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
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              {error && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export default RHFSelect;
