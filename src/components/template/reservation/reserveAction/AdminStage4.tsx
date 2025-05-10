import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFinalApprove } from "@/services/api/reserve";
import BtnLoader from "@/components/element/BtnLoader";
import { showToast } from "@/store/useToastSlice";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRouter } from "next/navigation";

type AdminStage4 = {
  serviceData: ServiceDetailsType | undefined;
  data: reservationDataType;
  reserveId: string | null;
};

const AdminStage4 = ({ serviceData, data, reserveId }: AdminStage4) => {
  const queryClient = useQueryClient();
  const { cancelReserve, isCanceling } = useCancelReserve();
  const router = useRouter();

  const {
    isError,
    error,
    isPending,
    mutateAsync: finalApprove,
  } = useMutation({
    mutationKey: ["admin_fanial_approve"],
    mutationFn: adminFinalApprove,
  });

  const onFinalApprove = async () => {
    await finalApprove({ reserveId, is_finished: true });
    await queryClient.invalidateQueries({ queryKey: ["get-stage", reserveId] });
  };

  if (isError) {
    showToast("خطا در دریافت اطلاعات", "error");
    console.log("error", error);
    return null;
  }

  const cancelHandler = async () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="p-4 border rounded space-y-6">
      <h2 className="text-lg font-semibold">اطلاعات نهایی رزرو</h2>

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
            <strong>قیمت کل:</strong> {data?.total_price?.toLocaleString()}{" "}
            تومان
          </p>
          <p>
            <strong>مدت زمان رزرو:</strong> {data?.reserve_duration} دقیقه
          </p>
          <p>
            <strong>توضیحات ادمین:</strong> {data?.admin_description || "—"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-blue-600 font-medium">
          تایید نهایی رزرو توسط شما انجام می‌شود.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onFinalApprove}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isPending ? <BtnLoader /> : "تایید نهایی ادمین"}
          </button>
          <button
            onClick={cancelHandler}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            لغو رزرو
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStage4;
