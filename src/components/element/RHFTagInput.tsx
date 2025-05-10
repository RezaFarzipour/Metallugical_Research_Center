import { Input } from "@heroui/react";
import { useState } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { IoClose } from "react-icons/io5";
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
    "dark:border-secondary-100",
  ],
  input: [
    "text-secondary-800",
    "placeholder:text-secondary-600",
    "text-default-600",
    "placeholder:text-default-600",
  ],
  error: ["border-red-500", "focus:border-red-500", "focus:ring-red-500/20"],
  wrapper: "relative",
  errorMessage: ["mt-1", "text-sm", "text-red-500"],
};
interface TagInputProps {
  field: ControllerRenderProps<any, any>;
  error?: FieldError;
  label: string;
}
export default function RHFTagInput({ field, error, label }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      if (!field.value.includes(inputValue.trim())) {
        field.onChange([...field.value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    field.onChange(field.value.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{label}</label>

      {/* INPUT REAL برای react-hook-form */}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="تگ را وارد کرده و Enter بزنید"
        variant="underlined"
        classNames={{
          inputWrapper: [
            ...inputStyles.inputWrapper,
            error && inputStyles.error,
          ].filter(Boolean),
          input: inputStyles.input.join(" "),
        }}
      />

      {/* نمایش تگ‌ها */}
      <div className="flex flex-wrap gap-2 mt-2">
        {field.value.map((tag: string, index: number) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <IoClose size={16} />
            </button>
          </span>
        ))}
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
