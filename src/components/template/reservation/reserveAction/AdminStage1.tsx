import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRejectReserve } from "@/hooks/useRejectReserve";
import { patchAcceptStage2 } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { sp } from "@/utils/formatter/numberFormatter";
import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const [description, setDescription] = useState<string>(
    reservationData?.admin_description || ""
  );
  const [duration, setDuration] = useState<number>(reservationData?.reserve_duration || 0);
  const [price, setPrice] = useState<number>(reservationData?.total_price || 0);
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
      service: reservationData?.service,
    });
  };

  //cancle reserve
  const cancelHandler = async () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, ""); // حذف ویرگول‌های قبلی
    const numeric = Number(raw);

    if (!isNaN(numeric)) {
      setPrice(numeric);
    }
  };

  if (isServiceLoading)
    return (
      <div>
        <BtnLoader />
      </div>
    );

  return (
    <div className=" ">
      <ReserveInfo serviceData={servicedata} reservationData={reservationData} />

      <div className="space-y-3 ">
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
            value={sp(price)}
            onChange={handleChange}
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

      <div className="flex gap-2 mt-4 justify-end w-full">
        <div className="flex gap-2 item-center">
          <Button
            variant="bordered"
            onPress={accepthandler}
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
    </div>
  );
};

export default AdminStage1;
