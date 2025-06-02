"use client";
import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { FaCheck } from "react-icons/fa";
import ReserveInfo from "@/components/module/ReserveInfo";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

type Stage6Props = {
  reservationData: reservationDataType;
  serviceData: ServiceDetailsType | undefined;
};

const FinalStage = ({ reservationData, serviceData }: Stage6Props) => {
  const router = useRouter();
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
      <Button
        variant="bordered"
        onPress={() => router.push("/")}
        className="bg-secondary-500 text-white px-4 py-2 mt-2 "
      >
        ادامه
      </Button>
    </div>
  );
};

export default FinalStage;
