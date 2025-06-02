"use client";

import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Hourglass } from "react-loader-spinner";

type WaitingStageProps = {
  reserveId?: string | null;
  serviceData?: ServiceDetailsType | undefined;
  reservationData?: reservationDataType;
  typographyContent: { main: string; span?: string };
  isAdmin?: boolean;
};

const WaitingStage = ({
  reserveId,
  serviceData,
  reservationData,
  typographyContent,
  isAdmin,
}: WaitingStageProps) => {
  const { cancelReserve, isCanceling } = useCancelReserve();

  const router = useRouter();

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="">
      <div className="my-4 flex  flex-col items-center justify-center gap-3">
        <Hourglass color="blue" height={40} width={40} />
        <p className="flex flex-col text-sm text-default-400">
          {typographyContent.main}
          <span className="pr-4"> {typographyContent.span}</span>
        </p>
      </div>

      <ReserveInfo
        serviceData={serviceData}
        reservationData={reservationData}
        isAdmin={isAdmin}
      />

      <div className="mt-8 flex justify-center">
        <Button
          onPress={cancelHandler}
          className="bg-red-500 text-white px-4 py-2 rounded "
        >
          {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
        </Button>
      </div>
    </div>
  );
};

export default WaitingStage;
