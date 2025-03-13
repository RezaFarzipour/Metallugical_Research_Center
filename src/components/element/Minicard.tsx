import React from "react";

type Props = {
  color: string;
  shadowColor1: string;
  shadowColor2: string;
};

const Minicard = ({ color, shadowColor1, shadowColor2 }: Props) => {
  return (
    <div className="w-[300px] h-[90px] bg-[#fff] rounded-[10px] overflow-hidden">
      {/* اضافه کردن box-shadow به دیو چایلد */}
      <div
        className="w-[105px] h-[90px] bg-red-300 rounded-[10px] -skew-x-[15deg] origin-bottom-left 
        shadow-[rgba(254,114,103,0.2)_-13px_0px,_rgba(254,114,103,0.1)_-23px_0px]"
      ></div>
    </div>
  );
};

export default Minicard;
