"use client";

import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import React from "react";

type CustomerWaitingStageProps = {
  reserveId: string | null;
};

const CustomerWaitingStage = ({ reserveId }: CustomerWaitingStageProps) => {
  const { cancelReserve, isCanceling } = useCancelReserve();

  const router = useRouter();

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold">در حال بررسی رزرو...</h2>
      <p>
        در حال حاضر اطلاعات شما توسط ادمین در حال بررسی است. لطفاً منتظر بمانید.
      </p>
      <div className="mt-4">
        <button
          onClick={cancelHandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
        </button>
      </div>
    </div>
  );
};

export default CustomerWaitingStage;
