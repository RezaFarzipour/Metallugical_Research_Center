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
import { sp } from "@/utils/formatter/numberFormatter";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { Button } from "@heroui/button";

type AdminStage3 = {
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  data: reservationDataType;
};

const AdminStage3 = ({
  serviceData,
  reserveId,
  data: reservationData,
}: AdminStage3) => {
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
      is_payment_verified: false,
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
    <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <p className="font-bold text-md my-3">تایید واریز</p>
 
{/* info section */}
      <div className="bg-blue-50 p-6 rounded-md max-w-xl mx-auto">
        <h2 className="text-lg font-bold mb-4">اطلاعات رزرو</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="font-medium">کاربر</div>
          <div>{reservationData.user || "نامشخص"}</div>

          <div className="font-medium">نام سرویس</div>
          <div>{serviceData?.data.service_name || "نامشخص"}</div>

          <div className="font-medium">توضیحات سرویس</div>
          <div>{serviceData?.data.description || "نامشخص"}</div>

          <div className="font-medium"> قیمت</div>
          <div>{sp(serviceData?.data.price) || "نامشخص"}</div>

          <div className="font-medium">تاریخ رزرو</div>
          <div>
            {formatDateRangesToPersian([
              {
                reserved_from: reservationData.reserve_from || "",
                reserved_to: reservationData.reserve_to || "",
              },
            ]) || "?"}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-md text-center my-4">
        فیش واریزی توسط مشتری
      </h3>
      <div className="my-4 border-1 max-w-xl mx-auto border-default-200">
        <div className="flex justify-center items-center p-3">
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
        </div>
      </div>

      <div className="flex gap-3 mt-4 justify-between w-full">
        <div className="flex gap-4 item-center">
          <Button
            variant="bordered"
            onPress={accepthandler}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isPending ? <BtnLoader /> : "تایید "}
          </Button>
          <Button
            variant="bordered"
            onPress={rejectHandler}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {rejecting_payment ? <BtnLoader /> : "عدم تایید"}
          </Button>
        </div>

        <Button
          variant="bordered"
          onPress={cancelHandler}
          className="bg-[#505E73] text-white px-4 py-2 rounded"
        >
          {isCanceling ? <BtnLoader /> : "لغو رزرو"}
        </Button>
      </div>
    </div>
  );
};

export default AdminStage3;
