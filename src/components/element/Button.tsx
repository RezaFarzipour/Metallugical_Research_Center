import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "warning" | "success";
  fullWidth?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  path?: string | undefined;
}

const Button = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  type = "button",
  path,
  disabled,
  ...props
}: ButtonProps) => {
  const router = useRouter();

  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold transition-all duration-300 ease-in-out rounded-md shadow-lg group";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-secondary-500 to-secondary-700 hover:from-secondary-600 hover:to-secondary-800",
    secondary:
      "text-white bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800",
    danger:
      "text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800",
    warning:
      "text-white bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800",
    success:
      "text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800",
  };

  const disabledStyles =
    "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none hover:from-gray-300 hover:to-gray-300";

  return (
    <button
      className={cn(
        baseStyles,
        disabled ? disabledStyles : variants[variant],
        fullWidth && "w-full",
        className
      )}
      type={type}
      disabled={disabled}
      onClick={() => {
        if (!disabled && path) router.push(path);
      }}
      {...props}
    >
      <span className="relative text-xs md:text-lg z-10">{children}</span>
    </button>
  );
};

export default Button;
