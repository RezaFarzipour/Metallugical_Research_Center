"use client";

import React from "react";
import Image from "next/image";
import TitleStructure from "../element/TitleStructure";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { sp } from "@/utils/formatter/numberFormatter";
import { reservationDataType } from "@/types";

type ReserveInfoProps = {
  serviceData?: {
    data: {
      service_name: string;
      description: string;
      price: number;
    };
  };
  reservationData?: reservationDataType;

  isAdmin?: boolean;
  isAdminName?: boolean;
  isAdminImage?: boolean;
  imageUrl?: string;
};

const ReserveInfo: React.FC<ReserveInfoProps> = ({
  serviceData,
  reservationData,
  isAdminImage = false,
  imageUrl = "",
}) => {
  return (
    <div className="bg-default-50 p-4 sm:p-6 rounded-md max-w-xl mx-auto text-sm">
      <TitleStructure size="text-[1rem]">اطلاعات رزرو</TitleStructure>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-y-3">
        <div className="font-medium">کاربر</div>
        <div>{reservationData?.user || "نامشخص"}</div>

        <div className="font-medium">نام سرویس</div>
        <div>{serviceData?.data?.service_name || "نامشخص"}</div>

        <div className="font-medium">توضیحات سرویس</div>
        <div>{serviceData?.data?.description || "نامشخص"}</div>

        <div className="font-medium">قیمت</div>
        <div>{sp(serviceData?.data?.price) || "نامشخص"}</div>

        <div className="font-medium">توضیحات ادمین:</div>
        <div>{reservationData?.admin_description || "نامشخص"}</div>

        <div className="font-medium">تاریخ رزرو</div>
        <div>
          {formatDateRangesToPersian([
            {
              reserved_from: reservationData?.reserve_from || "",
              reserved_to: reservationData?.reserve_to || "",
            },
          ]) || "?"}
        </div>

        {isAdminImage && (
          <>
            <div className="font-medium mt-2 sm:col-span-2">
              فیش واریزی توسط مشتری
            </div>
            <div className="flex justify-center items-center mt-2 sm:col-span-2">
              {reservationData?.payment_image && imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="فیش واریزی"
                  width={300}
                  height={300}
                  className="rounded border object-contain"
                />
              ) : (
                <p className="text-gray-500">فایلی ارسال نشده است.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReserveInfo;
