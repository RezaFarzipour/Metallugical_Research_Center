"use client";

import Image from "next/image";
import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";

type Props = {
    role: "customer" | "admin";
    serviceData: ServiceDetailsType | undefined;
    reserveId: string | null;
    setStage:(stage: number)=>void,
    data:reservationDataType
};

const Stage4 = ({
  role,
  serviceData,
  setStage,
  reserveId,
  data

}: Props) => {
  return (
    <div className="p-4 border rounded space-y-6">
        
      <h2 className="text-lg font-semibold">اطلاعات سرویس</h2>
      <div className="flex items-center gap-4">
        {serviceData?.data?.cover_image ? (
          <Image
            src={serviceData.data.cover_image}
            width={100}
            height={100}
            alt="سرویس"
            className="w-32 h-32 object-cover rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
            بدون تصویر
          </div>
        )}

        <div className="space-y-1">
          <p><strong>نام سرویس:</strong> {serviceData?.data?.service_name}</p>
          <p><strong>توضیحات:</strong> {serviceData?.data?.description}</p>
          <p><strong>قیمت:</strong> {serviceData?.data?.price?.toLocaleString()} تومان</p>
        </div>
      </div>

      {role === "customer" ? (
        <div className="space-y-4 text-center">
          <p className="text-yellow-600 font-medium">در انتظار تایید ادمین...</p>
          <button
    
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            لغو درخواست
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-semibold text-md">فیش واریزی توسط مشتری:</h3>
          {/* {receiptImageUrl ? (
            <Image
              src={receiptImageUrl}
              alt="فیش واریزی"
              width={300}
              height={300}
              className="rounded border"
            />
          ) : (
            <p className="text-gray-500">فایلی ارسال نشده است.</p>
          )} */}

          <div className="flex gap-4">
            <button
      
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              تایید
            </button>
            <button
      
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              عدم تایید
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage4;
