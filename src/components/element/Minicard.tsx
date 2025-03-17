import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  color: string;
  shadow: string;
  icon: React.ReactNode;
  label: string;
  count: number;
};

const Minicard = ({ color, shadow, icon, label, count }: Props) => {
  return (
    <div className="w-[300px] h-[90px] md:flex md:flex-grow bg-[#fff] rounded-[10px] overflow-hidden relative min-h-[90px]">
      <div
        className={twMerge(
          "w-[95px] md:w-[105px] h-[90px] rounded-[10px] -skew-x-[15deg] origin-bottom-left",
          color,
          shadow
        )}
      ></div>
      <p className="absolute top-10 right-8 text-md md:text-xl font-bold text-default-100">
        {icon}
      </p>
      <p className="absolute top-6  right-48 text-sm font-bold text-default-600 text-right">
        {label}
      </p>
      <p className="absolute bottom-6 right-48 text-sm font-bold text-default-600">
        {count}
      </p>
    </div>
  );
};

export default Minicard;
