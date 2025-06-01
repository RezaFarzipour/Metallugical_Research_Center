import { Input } from "@heroui/react";
import { useState } from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { IoClose } from "react-icons/io5";

interface InputStyles {
  inputWrapper: string[];
  input: string[];
  error: string[];
  wrapper: string;
  errorMessage: string[];
}

const inputStyles: InputStyles = {
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
  error: ["border-red-500", "focus-within:border-red-500", "ring-red-500/20"],
  wrapper: "relative",
  errorMessage: ["mt-1", "text-sm", "text-red-500"],
};

interface TagInputProps {
  field: ControllerRenderProps<{ tags: string[] }, "tags">;
  error?: FieldError;
  label: string;
}

export default function RHFTagInput({ field, error, label }: TagInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      const currentTags = Array.isArray(field.value) ? field.value : [];
      if (!currentTags.includes(trimmedValue)) {
        field.onChange([...currentTags, trimmedValue]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    field.onChange(
      (Array.isArray(field.value) ? field.value : []).filter(
        (tag: string) => tag !== tagToRemove
      )
    );
  };

  return (
    <div className={inputStyles.wrapper}>
      <Input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="تگ را وارد کرده و Enter بزنید"
        variant="underlined"
        label={label}
        classNames={{
          inputWrapper: [
            ...inputStyles.inputWrapper,
            ...(error ? inputStyles.error : []),
          ],
        }}
        aria-label={label}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {(Array.isArray(field.value) ? field.value : []).map(
          (tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-secondary-800 px-2 py-1 rounded flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`حذف تگ ${tag}`}
              >
                <IoClose size={16} />
              </button>
            </span>
          )
        )}
      </div>
    </div>
  );
}
