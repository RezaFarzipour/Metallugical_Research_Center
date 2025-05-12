"use client";

import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { sp } from "@/utils/formatter/numberFormatter";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { DotLoader } from "react-spinners";

type AdminStage2Props = {
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  data: reservationDataType;
};

const AdminStage2 = ({
  serviceData,
  reserveId,
  data: reservationData,
}: AdminStage2Props) => {
  const { cancelReserve, isCanceling } = useCancelReserve();

  const router = useRouter();

  console.log("reservationData", reservationData);

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <>
      <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
        <p className="font-bold text-md my-3">در انتظار پرداخت </p>

        <div className="my-4 flex  flex-col items-center justify-center gap-3">
          <DotLoader color="blue" size={40} />
          <p className="text-sm text-default-400">
            در انتظار ارسال فیش واریز توسط مشتری
          </p>
        </div>

{/* info section */}

        <div className="bg-blue-50 p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-lg font-bold mb-4">اطلاعات رزرو</h2>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="font-medium">کاربر</div>
            <div>{reservationData.user || "نامشخص"}</div>

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
                  reserved_from: reservationData.reserve_from || "",
                  reserved_to: reservationData.reserve_to || "",
                },
              ]) || "?"}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button
            onPress={cancelHandler}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminStage2;
