"use client";
import React from "react";
import { reservationDataType } from "@/types";
import { FaCheck } from "react-icons/fa";
import ReserveInfo from "@/components/module/ReserveInfo";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { ServiceDetailsType } from "@/types/serviceType";

type Stage6Props = {
  reservationData: reservationDataType;
  serviceData: ServiceDetailsType | undefined;
};



const FinalStage = ({ reservationData, serviceData }: Stage6Props) => {
  console.log("reservationData?.report_file",reservationData?.report_file)
  const router = useRouter();
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${reservationData?.payment_image}`;
  const reportFile = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${reservationData?.report_file}`;
  // const imageURL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${reservationData.payment_image}`;
  // console.log("reserveinfo", reservationData);
  // console.log("serviceinfo", serviceData);

  const handleDownload = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
  
      // استخراج نام فایل از URL
      const pathParts = fileUrl.split('/');
      const file_name = pathParts[pathParts.length - 1];
  
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };
  
  

  return (
    <div className="p-4 h-auto flex-col  flex justify-center items-center ">
      <div className="p-4 rounded-full bg-[#DCFCE7]">
        <FaCheck className="text-green-600" size={"25px"} />
      </div>
      <h2 className="text-xl text-default-500 font-extrabold my-4">
        رزرو با موفقیت انجام شد
      </h2>
      <ReserveInfo
        serviceData={serviceData}
        reservationData={reservationData}
        isAdminName={true}
      />

<div className="flex justify-center items-center gap-4 my-3">
  <Button
    onPress={() => handleDownload(imageUrl)}
    className="bg-primary-600 text-white hover:bg-primary-700"
  >
    دانلود فیش واریز
  </Button>

  <Button
    onPress={() => handleDownload(reportFile)}
    className="bg-primary-600 text-white hover:bg-secondary-700"
  >
    دانلود نتیجه‌ی خدمات
  </Button>
</div>

      <Button
        variant="bordered"
        onPress={() => router.push("/")}
        className="bg-secondary-500 text-white px-4 py-2 mt-2 "
      >
        ادامه
      </Button>

      {/* <Button
        as="a"
        href={imageURL}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        دانلود عکس پرداخت
      </Button> */}
    </div>
  );
};

export default FinalStage;
