"use client";

import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { useRouter } from "next/navigation";
import React from "react";
import { DotLoader } from "react-spinners";

type CustomerWaitingStageProps = {
  reserveId: string | null;
  serviceData: ServiceDetailsType | undefined;
  data: reservationDataType;
};

const CustomerWaitingStage = ({ reserveId ,serviceData,data}: CustomerWaitingStageProps) => {
  const { cancelReserve, isCanceling } = useCancelReserve();

  const router = useRouter();



  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <p className="font-bold text-md my-3">در انتظار تایید ادمین</p>

      <div className="my-4 flex  flex-col items-center justify-center gap-3">
        <DotLoader color="blue" size={40} />
        <p className="text-sm text-default-400">
          درخواست شما درحال بررسی توسط ادمین است
          <br />
          این پروسه معمولا ۱-۲ روز کاری زمان میبرد
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-md max-w-xl mx-auto">
        <h2 className="text-lg font-bold mb-4">اطلاعات رزرو</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="font-medium">نام سرویس:</div>
          <div>{serviceData?.data.service_name}</div>

          <div className="font-medium">توضیحات سرویس</div>
          <div>{serviceData?.data.description}</div>
          <div className="font-medium"> تاریخ رزرو</div>
          <div>{formatDateRangesToPersian([
            {
              reserved_from: data.reserve_from || "",
              reserved_to: data.reserve_to || "",
            },
          ]) || "?"}</div> 
        </div>
      </div>


      <div className="mt-4">
        <button
          onClick={cancelHandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
        </button>
      </div>
    </div>
  );
};

export default CustomerWaitingStage;
