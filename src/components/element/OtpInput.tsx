import { InputOtp, InputOtpProps } from "@heroui/react";
import React from "react";

const otpStyles = {
  segmentWrapper: "gap-x-2",
  segment: [
    "after:content-['']",
    "after:rounded-full",
    "after:bg-secondary-500",
    "after:transition",
    "after:!duration-500",
    "[&[data-focus]]:outline-none",
    "[&[data-focus]]:border-none",
    "[&[data-focus]]:ring-0",
    "[&[data-focus]]:text-secondary-500",
  ],
};

interface OtpInputProps extends Omit<InputOtpProps, "classNames"> {
  errorMessage?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ errorMessage, ...props }) => {
  return (
    <InputOtp
      variant="underlined"
      dir="ltr"
      errorMessage={errorMessage}
      classNames={otpStyles}
      {...props}
    />
  );
};

export default OtpInput;
