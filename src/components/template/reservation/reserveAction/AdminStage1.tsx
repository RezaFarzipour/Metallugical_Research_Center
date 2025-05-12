import BtnLoader from "@/components/element/BtnLoader";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import { useRejectReserve } from "@/hooks/useRejectReserve";
import { patchAcceptStage2 } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { sp } from "@/utils/formatter/numberFormatter";
import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type AdminStage1Type = {
  reserveId: string | null;
  servicedata: ServiceDetailsType | undefined;
  isServiceLoading: boolean;
  data: reservationDataType;
};

const AdminStage1 = ({
  data,
  reserveId,
  servicedata,
  isServiceLoading,
}: AdminStage1Type) => {
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
    <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
        <p className="font-bold text-md my-3">جزييات رزرو </p>

{/* info section */}
<div className="bg-blue-50 p-6 rounded-md max-w-xl mx-auto">
        <h2 className="text-lg font-bold mb-4">اطلاعات رزرو</h2>
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="font-medium">نام سرویس:</div>
          <div>{servicedata?.data.service_name ||"نامشخص"}</div>

          <div className="font-medium">توضیحات سرویس</div>
          <div>{servicedata?.data.description || "نامشخص"}</div>

          <div className="font-medium">تاریخ رزرو</div>
          <div>{formatDateRangesToPersian([
            {
              reserved_from: data.reserve_from || "",
              reserved_to: data.reserve_to || "",
            },
          ]) || "?"}</div> 
        </div>
      </div>

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

      <div className="flex gap-3 mt-4 justify-between w-full">
        <div className="flex gap-4 item-center">
        <Button
        variant="bordered"
          onPress={accepthandler}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isAccepting ? <BtnLoader /> : "تایید "}
        </Button>
        <Button
         variant="bordered"
         onPress={rejecthandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          {isRejecting ? <BtnLoader /> : "عدم تایید"}
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

export default AdminStage1;
