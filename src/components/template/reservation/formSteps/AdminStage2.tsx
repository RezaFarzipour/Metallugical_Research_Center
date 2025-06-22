"use client";
import { reservationDataType, ServiceDetailsType } from "@/types";
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
  return (
    <>
      <div className="">
        <WaitingStage
          reserveId={reserveId}
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
