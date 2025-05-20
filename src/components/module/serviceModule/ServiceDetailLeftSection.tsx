import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Button } from "@heroui/button";
import React from "react";
import CustomeDateRangePicker from "../customeDataPicker/CustomeCallender";
import { BtnLoader } from "@/components/element/Loader";
import { cn } from "@/utils/cn";

type ServiceDetailLeftSectionProps = {
  price: number;
  isConfirmDisabled: boolean;
  isCreating: boolean;
  isPatching: boolean;
  handleConfirm: () => void;
  rangeHandler: (reserved_from: Date, reserved_to: Date) => void;
  reserved_from: string | undefined ;
  reserved_to: string | undefined;
};

const ServiceDetailLeftSection = ({
  price,
  isConfirmDisabled,
  isCreating,
  isPatching,
  handleConfirm,
  rangeHandler,
  reserved_from,
  reserved_to,
}: ServiceDetailLeftSectionProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-2 flex flex-col-reverse lg:flex-row gap-6 justify-around">
      {/* قیمت رزرو */}
      <div className=" p-4 rounded-lg w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-md text-gray-500 font-bold">قیمت رزرو</h2>
            <p className="text-blue-600 text-lg font-bold">
              {toPersianNumbersWithComma(price)}&nbsp;تومان
            </p>
          </div>

          <p className="text-green-600 text-xs pt-6">
            ( این قیمت پیش‌فرض است و در حین رزرو ممکن است توسط ادمین تغییر کند)
          </p>

          <div className="w-full h-[2px] mt-6 bg-gray-300" />
          <p className="mt-5 text-sm">
            قیمت نهایی پس از مرحله‌ی دوم رزرو در توضیحات ادمین مشخص می‌شود
          </p>
          <div className="w-full h-[2px] mt-6 bg-gray-300" />
        </div>

        <div className="flex w-full justify-center mt-5">
          <Button
            disabled={isConfirmDisabled}
            className={cn(
              "text-white px-4 py-2 w-full",
              isConfirmDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary-500 hover:bg-secondary-600"
            )}
            onPress={handleConfirm}
          >
            {isCreating || isPatching ? <BtnLoader /> : "انتخاب رزرو"}
          </Button>
        </div>
      </div>

      {/* تقویم */}
      
      <div className="w-full lg:w-1/3 flex justify-center items-center">
        <CustomeDateRangePicker
          onRangeSelect={rangeHandler}
          reserveData={{
            reserved_from: reserved_from || "",
            reserved_to: reserved_to || "",
          }}
        />
      </div>
    </div>
  );
};

export default ServiceDetailLeftSection;
