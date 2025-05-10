import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import Image from "next/image";

type Stage6Props = {
  data: reservationDataType;
  serviceData: ServiceDetailsType | undefined;
};

const FinalStep = ({ data, serviceData }: Stage6Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center p-6">
      <h2 className="text-2xl font-bold text-green-600">
        رزرو با موفقیت انجام شد!
      </h2>

      <div className="p-4 border rounded shadow-md max-w-md w-full space-y-4 bg-white">
        {serviceData?.data?.cover_image ? (
          <Image
            src={serviceData.data.cover_image}
            width={100}
            height={100}
            alt="سرویس"
            className="w-32 h-32 object-cover mx-auto rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500 mx-auto rounded">
            بدون تصویر
          </div>
        )}

        <div className="space-y-1 text-right">
          <p>
            <strong>نام سرویس:</strong> {serviceData?.data?.service_name}
          </p>
          <p>
            <strong>قیمت کل:</strong> {data?.total_price?.toLocaleString()}{" "}
            تومان
          </p>
          <p>
            <strong>مدت زمان رزرو:</strong> {data?.reserve_duration} دقیقه
          </p>
          <p>
            <strong>توضیحات ادمین:</strong> {data?.admin_description || "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
