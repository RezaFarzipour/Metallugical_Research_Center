"use client";

import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { reservationDataType, ServiceDetailsType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <>
      <h2 className="text-lg font-semibold">اطلاعات دستگاه</h2>
      <div className="flex items-center gap-4">
        {serviceData?.data?.cover_image ? (
          <Image
            src={serviceData?.data?.cover_image}
            width={400}
            height={400}
            alt={serviceData?.data?.service_name}
            className="w-32 h-32 object-cover rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            بدون تصویر
          </div>
        )}

        <div>
          <p>
            <strong>نام دستگاه:</strong> {serviceData?.data?.service_name}
          </p>
          <p>
            <strong>توضیحات:</strong> {serviceData?.data?.description}
          </p>
          <p>
            <strong>قیمت:</strong>{" "}
            {reservationData?.total_price.toLocaleString()} تومان
          </p>
        </div>
      </div>
      <div className="p-4 border rounded bg-yellow-50 text-center">
        <p>در انتظار آپلود فیش پرداخت توسط کاربر...</p>
      </div>

      <div className="mt-4">
        <button
          onClick={cancelHandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
        </button>
      </div>
    </>
  );
};

export default AdminStage2;
