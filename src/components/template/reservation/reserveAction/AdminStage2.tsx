"use client";

import { useCancelReserve } from "@/components/template/reservation/reserveAction/useCancelReserve";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import WaitingStage from "./WaitingStage";

type AdminStage2Props = {
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  reservationData: reservationDataType;
  typographyContent: { main?: string; span?: string };
};

const AdminStage2 = ({
  serviceData,
  reserveId,
  reservationData: reservationData,
  typographyContent,
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
      <div className="">
        <WaitingStage
          typographyContent={typographyContent}
          serviceData={serviceData}
          reservationData={reservationData}
          isAdmin={true}
        />
      </div>
    </>
  );
};

export default AdminStage2;
