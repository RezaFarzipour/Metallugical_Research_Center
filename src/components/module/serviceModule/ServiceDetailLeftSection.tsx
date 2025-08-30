import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Button } from "@heroui/button";
import React from "react";
import CustomeDateRangePicker from "../customeDataPicker/CustomeCallender";
import { BtnLoader } from "@/components/element/Loader";
import { cn } from "@/utils/cn";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { usePathname } from "next/navigation";

type ServiceDetailLeftSectionProps = {
  price: number;
  isConfirmDisabled?: boolean;
  isCreating: boolean;
  isPatching: boolean;
  handleConfirm: () => void;
  rangeHandler?: (reserved_from: Date, reserved_to: Date) => void;
  reserved_from: string | undefined;
  reserved_to: string | undefined;
  course?: boolean;
  reserve_date: any;
};

const ServiceDetailLeftSection = ({
  course = false,
  price,
  reserve_date,
  isConfirmDisabled,
  isCreating,
  isPatching,
  handleConfirm,
  rangeHandler,
  reserved_from,
  reserved_to,
}: ServiceDetailLeftSectionProps) => {
  const pathname = usePathname();
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col lg:flex-row gap-16">
      {/* بخش قیمت رزرو */}
      <div
        className={cn(
          "p-4 rounded-lg w-full flex flex-col justify-between order-2 lg:order-1",
          !course && "lg:w-1/2"
        )}
      >
        <div>
          <div className="space-y-4">
            {/* تاریخ رزرو */}
            {course && (
              <>
                <div className="flex justify-between">
                  <h2 className="text-md text-gray-500 font-bold">
                    تاریخ رزرو دوره
                  </h2>
                  {reserve_date && reserve_date.length > 0 && (
                    <ul className="text-sm text-gray-600 mt-2 space-y-2">
                      {reserve_date.map((dateItem: any, index: number) => (
                        <li key={index}>
                          {formatDateRangesToPersian2(dateItem.reserved_from)}{" "}
                          تا {formatDateRangesToPersian2(dateItem.reserved_to)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-full h-[1px] bg-gray-300" />
              </>
            )}

            {/* قیمت رزرو */}
            <div className="flex justify-between">
              <h2 className="text-md text-gray-500 font-bold">
                قیمت رزرو دوره
              </h2>
              <p className="text-blue-600 text-lg font-bold">
                {toPersianNumbersWithComma(price)}&nbsp;تومان
              </p>
            </div>
          </div>

          <p className="text-green-600 text-xs pt-6">
            ( این قیمت پیش‌فرض است و در حین رزرو ممکن است توسط ادمین تغییر کند)
          </p>
          {!course && (
            <p className="text-green-600 text-xs pt-6">
              (اگر فقط یک تاریخ را انتخاب می‌کنید، باید دوبار کلیک کنید)
            </p>
          )}

          <div className="w-full h-[2px] mt-6 bg-gray-300" />
          <p className="mt-5 text-sm">
            قیمت نهایی پس از مرحله‌ی دوم رزرو در توضیحات ادمین مشخص می‌شود
          </p>
          <div className="w-full h-[2px] mt-6 bg-gray-300" />
        </div>

        {/* دکمه */}
        <div className="flex w-full justify-center mt-5">
          <Button
            disabled={pathname.includes("/courses") ? false : isConfirmDisabled}
            className={cn(
              `text-white px-4 py-2 ${
                pathname.includes("/courses") ? "w-1/3" : "w-full"
              }`,
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
      {!course && (
        <div className="w-full lg:w-1/3 flex justify-center items-center order-1 lg:order-2">
          <CustomeDateRangePicker
            onRangeSelect={rangeHandler}
            reserveData={{
              reserved_from: reserved_from || "",
              reserved_to: reserved_to || "",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceDetailLeftSection;
