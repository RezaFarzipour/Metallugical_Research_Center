"use client";
import { BtnLoader } from "@/components/element/Loader";
import ReservationTemplate from "@/components/template/reservation/ReservationTemplate";
import { Suspense } from "react";
const Reservation = () => {
  return (
    <Suspense
      fallback={
        <div>
          <BtnLoader />
        </div>
      }
    >
      <ReservationTemplate />
    </Suspense>
  );
};

export default Reservation;
