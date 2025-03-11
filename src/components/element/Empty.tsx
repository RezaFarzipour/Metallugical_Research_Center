import React from "react";
import { HiArrowRight } from "react-icons/hi";

type Props = {};

const Empty = (props: Props) => {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <div>
          <h1 className="text-xl font-bold text-secondary-700 mb-8">
            شما هنوز سفارش تکمیل شده ای ندارید.
          </h1>
          <button className="flex items-center gap-x-2 text-secondary-500">
            <HiArrowRight className="w-6 h-6 text-primary-900" />
            <span> رفتن به صفحه خدمات ها</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Empty;
