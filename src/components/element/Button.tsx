import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const Button = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";

  const variants = {
    primary: "bg-primary-500 text-primary-50 hover:bg-primary-600",
    secondary: "bg-secondary-500 text-primary-50 hover:bg-secondary-600",
  };

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
