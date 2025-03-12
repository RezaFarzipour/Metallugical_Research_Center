import React from "react";
import { MdArrowOutward } from "react-icons/md";

const HoverIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-6 h-7">
      {/* ایکون بالایی */}
      <div
        className={`absolute top-0 left-0 transition-all duration-300 ${
          isHovered
            ? "-translate-y-10 translate-x-5 opacity-0" // حرکت به بالا و راست + محو شدن
            : "translate-y-0 translate-x-0 opacity-100" // موقعیت اولیه
        }`}
      >
        <MdArrowOutward size={20} className="text-default-500" />
      </div>

      {/* ایکون پایینی */}
      <div
        className={`absolute  top-0 left-0 transition-all duration-300 ${
          isHovered
            ? "translate-y-0 translate-x-0 opacity-100" // حرکت به موقعیت نهایی
            : "translate-y-5 -translate-x-5 opacity-0" // شروع از پایین و راست
        }`}
      >
        <MdArrowOutward size={20} className="text-secondary-500" />
      </div>
    </div>
  );
};

export default HoverIcon;
