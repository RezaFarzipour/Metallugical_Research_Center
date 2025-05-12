import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFinalApprove } from "@/services/api/reserve";
import BtnLoader from "@/components/element/BtnLoader";
import { showToast } from "@/store/useToastSlice";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import { sp } from "@/utils/formatter/numberFormatter";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { Button } from "@heroui/button";

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
    <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <p className="font-bold text-md my-3">اطلاعات نهایی رزرو</p>
      <p className="text-default-400 font-medium text-center mb-2">
        تایید نهایی رزرو توسط شما انجام می‌شود.
      </p>

      {/* info section */}
      <div className="bg-[#F0FDF4] p-6 rounded-md max-w-xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-center">اطلاعات رزرو</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="font-medium">کاربر</div>
          <div>{data.user || "نامشخص"}</div>

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
                reserved_from: data.reserve_from || "",
                reserved_to: data.reserve_to || "",
              },
            ]) || "?"}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Button
          variant="bordered"
            onPress={onFinalApprove}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isPending ? <BtnLoader /> : "تایید نهایی ادمین"}
          </Button>
          <Button
           variant="bordered"
            onPress={cancelHandler}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            لغو رزرو
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminStage4;
