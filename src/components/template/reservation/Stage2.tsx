import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRejectReserve } from "@/hooks/useRejectReserve";
import {
  patchAcceptStage2,
} from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Stage2PropsType = {
  reserveId: string | null;
  role: "customer" | "admin";
  servicedata: ServiceDetailsType | undefined;
  isServiceLoading: boolean;
  setStage: (stage: number) => void;
  data: reservationDataType;
};

const Stage2 = ({
  role,
  data,
  reserveId,
  servicedata,
  isServiceLoading,
  setStage,
}: Stage2PropsType) => {
  const [description, setDescription] = useState<string>(
    data?.admin_description || ""
  );
  const [duration, setDuration] = useState<number>(data?.reserve_duration || 0);
  const [price, setPrice] = useState<number>(data?.total_price || 0);
  const queryClient = useQueryClient();
  const { cancelReserve, isCanceling } = useCancelReserve();
  const { rejectReserve, isRejecting } = useRejectReserve();

  const router = useRouter();

  const { isPending: isAccepting, mutateAsync: acceptStage2 } = useMutation({
    mutationKey: ["accept-stage2"],
    mutationFn: patchAcceptStage2,
  });

  //accept reserve by admin

  const accepthandler = async () => {
    await acceptStage2(
      {
        reserveId,
        admin_description: description,
        reserve_duration: duration,
        total_price: price,
        is_reservation_time_verified: true,
      },
      {
        onSuccess: async () => {
          showToast("رزرو با موفقیت تایید شد", "success");
          await queryClient.invalidateQueries({
            queryKey: ["get-stage", reserveId],
          });
        },
        onError: () => {
          showToast("خطا در تایید رزرو", "error");
        },
      }
    );
  };

  //reject reserve by admin

  const rejecthandler = async () => {
    rejectReserve({
      reserveId,
      admin_description: "",
      service: data?.service,
    });
  };

  //cancle reserve
  const cancelHandler = async () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  if (isServiceLoading)
    return (
      <div>
        <BtnLoader />
      </div>
    );

  if (role === "admin") {
    return (
      <div className="p-4 space-y-4 border rounded-md">
        <h2 className="text-xl font-semibold">جزئیات رزرو</h2>

        <div>
          <p>
            <strong>نام دستگاه:</strong>{" "}
            {servicedata?.data.service_name || "نامشخص"}
          </p>

          <p>
            تاریخ رزرو:{" "}
            {formatDateRangesToPersian([
              {
                reserved_from: data.reserve_from || "",
                reserved_to: data.reserve_to || "",
              },
            ]) || "?"}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block">مدت زمان اجاره (ساعت)</label>
            <input
              type="text"
              className="border px-2 py-1 w-full"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block">قیمت کل (تومان)</label>
            <input
              type="text"
              className="border px-2 py-1 w-full"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block">توضیحات ادمین</label>
            <textarea
              className="border px-2 py-1 w-full"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={accepthandler}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isAccepting ? <BtnLoader /> : "تایید "}
          </button>
          <button
            onClick={rejecthandler}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {isRejecting ? <BtnLoader /> : "عدم تایید"}
          </button>

          <button
            onClick={cancelHandler}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            {isCanceling ? <BtnLoader /> : "لغو رزرو"}
          </button>
        </div>
      </div>
    );
  }

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

export default Stage2;
