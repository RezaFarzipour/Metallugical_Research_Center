import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { sp } from "@/utils/formatter/numberFormatter";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";

type Stage6Props = {
  data: reservationDataType;
  serviceData: ServiceDetailsType | undefined;
};

const FinalStep = ({ data, serviceData }: Stage6Props) => {
  return (
    <div className="w-full container rounded-xl h-auto flex-col  flex justify-center items-center bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <div className="p-6 rounded-full bg-[#DCFCE7]">
        <FaCheck className="text-green-600" size={"25px"} />
      </div>
      <h2 className="text-xl font-extrabold my-4">رزرو با موفقیت انجام شد</h2>


<div className="bg-[#F0FDF4] p-6 rounded-md max-w-xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-center">اطلاعات رزرو</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="font-medium">کاربر</div>
          <div>{data.user || "نامشخص"}</div>

          <div className="font-medium">نام سرویس</div>
          <div>{serviceData?.data.service_name || "نامشخص"}</div>

          <div className="font-medium">توضیحات سرویس</div>
          <div>{serviceData?.data.description || "نامشخص"}</div>

          <div className="font-medium"> قیمت</div>
          <div>{sp(serviceData?.data.price) || "نامشخص"}</div>

          <div className="font-medium">تاریخ رزرو</div>
          <div>
            {formatDateRangesToPersian([
              {
                reserved_from: data.reserve_from || "",
                reserved_to: data.reserve_to || "",
              },
            ]) || "?"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
