import { BtnLoader } from "@/components/element/Loader";
import RHFInput from "@/components/element/RHFInput";
import ReserveInfo from "@/components/module/ReserveInfo";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { useRejectReserve } from "@/components/template/reservation/hooks/useRejectReserve";
import {
  AdminReserveInputsFormData,
  AdminReserveInputsSchema,
} from "@/schemas/adminReservationInputsScehma";
import { patchAcceptStage2 } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type AdminStage1Type = {
  reserveId: string | null;
  servicedata: ServiceDetailsType | undefined;
  isServiceLoading: boolean;
  reservationData: reservationDataType;
};

const AdminStage1 = ({
  reservationData,
  reserveId,
  servicedata,
  isServiceLoading,
}: AdminStage1Type) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminReserveInputsFormData>({
    resolver: zodResolver(AdminReserveInputsSchema),
    mode: "onTouched",
  });
  const queryClient = useQueryClient();
  const { cancelReserve, isCanceling } = useCancelReserve();
  const { rejectReserve, isRejecting } = useRejectReserve();

  const router = useRouter();

  const { isPending: isAccepting, mutateAsync: acceptStage2 } = useMutation({
    mutationKey: ["accept-stage2"],
    mutationFn: patchAcceptStage2,
  });

  //accept reserve by admin

  const accepthandler = async (data: AdminReserveInputsFormData) => {
    await acceptStage2(
      {
        reserveId,
        admin_description: data.admin_description,
        reserve_duration: data.reserve_duration,
        total_price: data.total_price,
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
      service: reservationData?.service,
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

  return (
    <div className=" ">
      <ReserveInfo
        serviceData={servicedata}
        reservationData={reservationData}
      />
      <form onSubmit={handleSubmit(accepthandler)} className="space-y-4 p-6">
        <div className="space-y-3 ">
          <div>
            <RHFInput<AdminReserveInputsFormData>
              register={register}
              errors={errors}
              label="مدت زمان اجاره(ساعت)"
              type="number"
              dir="rtl"
              name="reserve_duration"
            />
          </div>

          <div>
            <RHFInput<AdminReserveInputsFormData>
              register={register}
              errors={errors}
              label="  قیمت کل(تومان)"
              type="number"
              dir="rtl"
              name="total_price"
            />
          </div>

          <div>
            <RHFInput<AdminReserveInputsFormData>
              register={register}
              errors={errors}
              label=" توضیحات ادمین"
              type="text"
              dir="rtl"
              name="admin_description"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4 justify-end w-full">
          <div className="flex gap-2 item-center">
            <Button
              variant="bordered"
              type="submit"
              // onPress={accepthandler}
              className="bg-secondary-500 text-white px-4 py-2 "
            >
              {isAccepting ? <BtnLoader /> : "تایید "}
            </Button>
            <Button
              variant="bordered"
              onPress={rejecthandler}
              className="bg-red-500 text-white px-4 py-2 "
            >
              {isRejecting ? <BtnLoader /> : "عدم تایید"}
            </Button>
            <Button
              variant="bordered"
              onPress={cancelHandler}
              className="bg-default-300 text-white px-4 py-2 "
            >
              {isCanceling ? <BtnLoader /> : "لغو رزرو"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminStage1;
