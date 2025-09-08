"use client";
import React from "react";
import { reservationDataType } from "@/types";
import { FaCheck } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import ReserveInfo from "@/components/module/ReserveInfo";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { ServiceDetailsType } from "@/types/serviceType";
import { showToast } from "@/store/useToastSlice";

type Stage6Props = {
  reservationData: reservationDataType;
  serviceData: ServiceDetailsType | undefined;
};

const FinalStage = ({ reservationData, serviceData }: Stage6Props) => {
  const router = useRouter();
  const imageUrl = reservationData?.payment_image;
  const reportFile = reservationData?.report_file;

  const handleDownload = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      const pathParts = fileUrl.split("/");
      const file_name = pathParts[pathParts.length - 1];

      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
      const errorMessage = error?.message || "دانلود فایل ناموفق بود";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="p-4 h-auto flex flex-col justify-center items-center gap-6">
      {/* تایید موفقیت */}
      <div className="p-5 rounded-full bg-green-100 flex items-center justify-center">
        <FaCheck className="text-green-600" size={28} />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-default-500 text-center">
        رزرو با موفقیت انجام شد
      </h2>

      {/* اطلاعات رزرو */}
      <ReserveInfo
        serviceData={serviceData}
        reservationData={reservationData}
        isAdminName={true}
      />

      {/* دکمه‌های دانلود */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
        <Button
          variant="bordered"
          onPress={() =>
            handleDownload(
              `/api/downloadImage?url=${encodeURIComponent(imageUrl)}`
            )
          }
          className="flex items-center gap-2 text-default-500 px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <IoMdDownload size={20} />
          دانلود فیش واریز
        </Button>

        <Button
          variant="bordered"
          onPress={() =>
            handleDownload(
              `/api/downloadImage?url=${encodeURIComponent(reportFile)}`
            )
          }
          className="flex items-center gap-2  text-default-500 px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <IoMdDownload size={20} />
          دانلود نتیجه‌ی خدمات
        </Button>
      </div>

      {/* دکمه ادامه */}
      <Button
        variant="bordered"
        onPress={() => router.push("/")}
        className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-lg mt-4 shadow-md transition-transform transform hover:scale-105"
      >
        ادامه
      </Button>
    </div>
  );
};

export default FinalStage;
