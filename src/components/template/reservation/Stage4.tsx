"use client";
import Image from "next/image";
import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentVerified } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import { useRejectReserve } from "@/hooks/useRejectReserve";

type Stage4Props = {
  role: "customer" | "admin";
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  setStage: (stage: number) => void;
  data: reservationDataType;
};

const Stage4 = ({
  role,
  serviceData,
  setStage,
  reserveId,
  data: reservationData,
}: Stage4Props) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${reservationData?.payment_image}`;

  const {
    isPending,
    error,
    isError,
    mutateAsync: paymentApproved,
  } = useMutation({
    mutationKey: ["confirm_payment_image"],
    mutationFn: paymentVerified,
  });

  const queryClient = useQueryClient();
  const { cancelReserve, isCanceling } = useCancelReserve();
  const router = useRouter();
  const { rejectReservePaymentImage, rejecting_payment } = useRejectReserve();

  //admin accept payment_image
  const accepthandler = async () => {
    await paymentApproved({ reserveId, is_payment_verified: true });
    await queryClient.invalidateQueries({ queryKey: ["get-stage", reserveId] });
  };

  const rejectHandler = async () => {
    rejectReservePaymentImage({
      reserveId,
      is_payment_verified:false,

    });
  };

  if (isError) {
    showToast("خطا در دریافت اطلاعات", "error");
    console.log("error", error);
    return null; // یا یک پیام خطا بصری
  }

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="p-4 border rounded space-y-6">
      <h2 className="text-lg font-semibold">اطلاعات سرویس</h2>
      <div className="flex items-center gap-4">
        {serviceData?.data?.cover_image ? (
          <Image
            src={serviceData.data.cover_image}
            width={100}
            height={100}
            alt="سرویس"
            className="w-32 h-32 object-cover rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
            بدون تصویر
          </div>
        )}

        <div className="space-y-1">
          <p>
            <strong>نام سرویس:</strong> {serviceData?.data?.service_name}
          </p>
          <p>
            <strong>توضیحات:</strong> {serviceData?.data?.description}
          </p>
          <p>
            <strong>قیمت:</strong>{" "}
            {reservationData?.total_price.toLocaleString()} تومان
          </p>
        </div>
      </div>

      {role === "customer" ? (
        <div className="space-y-4 text-center">
          <p className="text-yellow-600 font-medium">
            در انتظار تایید ادمین...
          </p>
          <button
            onClick={cancelHandler}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {isCanceling ? <BtnLoader /> : "لغو رزرو"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-semibold text-md">فیش واریزی توسط مشتری:</h3>
          {reservationData?.payment_image ? (
            <Image
              src={imageUrl}
              alt="فیش واریزی"
              width={300}
              height={300}
              className="rounded border"
            />
          ) : (
            <p className="text-gray-500">فایلی ارسال نشده است.</p>
          )}

          <div className="flex gap-4">
            <button
              onClick={accepthandler}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isPending ? <BtnLoader /> : "تایید"}
            </button>
            <button
              onClick={rejectHandler}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              {isPending ? <BtnLoader /> : "عدم تایید"}
            </button>

            <button
              onClick={cancelHandler}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              {isPending ? <BtnLoader /> : "کنسل"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage4;
