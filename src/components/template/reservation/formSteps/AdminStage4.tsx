import React from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFinalApprove } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";

type AdminStage4 = {
  serviceData: ServiceDetailsType | undefined;
  reservationData: reservationDataType;
  reserveId: string | null;
};

const AdminStage4 = ({
  serviceData,
  reservationData,
  reserveId,
}: AdminStage4) => {
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
    <div className="">
      <ReserveInfo
        serviceData={serviceData}
        reservationData={reservationData}
        isAdminName={true}
      />

      <div className="space-y-4">
        <div className="flex justify-end gap-4">
          <Button
            variant="bordered"
            onPress={onFinalApprove}
            className="bg-secondary-600 text-white px-4 py-2 "
          >
            {isPending ? <BtnLoader /> : "تایید نهایی ادمین"}
          </Button>
          <Button
            variant="bordered"
            onPress={cancelHandler}
            className="bg-red-600 text-white px-4 py-2 "
          >
            لغو رزرو
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminStage4;
