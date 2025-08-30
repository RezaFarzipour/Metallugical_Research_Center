"use client";
import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { reservationDataType } from "@/types";
import { ServiceDetailsType } from "@/types/serviceType";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners"; // ✅ جایگزین Hourglass

type WaitingStageProps = {
  reserveId?: string | null;
  serviceData?: ServiceDetailsType | undefined;
  reservationData?: reservationDataType;
  typographyContent: { main?: string; span?: string };
  isAdmin?: boolean;
  source?: "service" | "course" | null;
};

const WaitingStage = ({
  source,
  reserveId,
  serviceData,
  reservationData,
  typographyContent,
  isAdmin,
}: WaitingStageProps) => {
  const { cancelReserve, isCanceling } = useCancelReserve();
  const router = useRouter();

  // cancel reserve
  const cancelHandler = () => {
    if (reserveId) {
      cancelReserve(reserveId, () => {
        router.push(`${source === "service" ? "/services" : "courses"}`);
      });
    }
  };

  return (
    <div className="">
      <div className="my-4 flex flex-col items-center justify-center gap-3">
        {/* Loader به جای Hourglass */}
        <ClipLoader size={40} color="#0d6efd" />

        <p className="flex flex-col text-sm text-default-400">
          {typographyContent.main}
          <span className="pr-4"> {typographyContent.span}</span>
        </p>
      </div>

      <ReserveInfo
        source={source}
        serviceData={serviceData}
        reservationData={reservationData}
        isAdmin={isAdmin}
      />

      <div className="mt-8 flex justify-center">
        <Button
          onPress={cancelHandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
        </Button>
      </div>
    </div>
  );
};

export default WaitingStage;
