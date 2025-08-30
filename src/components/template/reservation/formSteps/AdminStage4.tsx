import React, { useState } from "react";
import { reservationDataType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFinalApprove, sendReceipt } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";
import { ServiceDetailsType } from "@/types/serviceType";
import FileInput from "@/components/element/FileInput";
import { Controller, useForm } from "react-hook-form";
import {
  PaymentFormData,
  paymentImageSchema,
} from "@/schemas/payment_ImageSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [receiptFile, setReceiptFile] = useState<string | null>(null);
  const router = useRouter();

  const { isError, error, isPending } = useMutation({
    mutationKey: ["admin_fanial_approve"],
    mutationFn: adminFinalApprove,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentImageSchema),
    defaultValues: {
      payment_image: null,
    },
  });

  const { mutateAsync: sendImage } = useMutation({
    mutationKey: ["send-image"],
    mutationFn: sendReceipt,
  });

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

  const onSubmit = async (data: PaymentFormData) => {
    if (!data.payment_image) return;

    const formData = new FormData();
    formData.append("report_file", data.payment_image);
    formData.append("is_finished", "true");

    await sendImage(
      { reserveId, data: formData },
      {
        onSuccess: async () => {
          showToast("فیش پرداخت با موفقیت ارسال شد", "success");
          await queryClient.invalidateQueries({
            queryKey: ["get-stage", reserveId],
          });
        },
        onError: () => {
          showToast("خطا در ارسال فیش پرداخت", "error");
        },
      }
    );
  };

  return (
    <div className="">
      <ReserveInfo
        serviceData={serviceData}
        reservationData={reservationData}
        isAdminName={true}
      />

      {/* فرم آپلود و تایید */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center items-center my-4">
          <Controller
            name="payment_image"
            control={control}
            render={({ field: { name, onChange, ref } }) => (
              <>
                {!receiptFile ? (
                  <FileInput
                    multiple={false}
                    label="آپلود نتیجه خدمات"
                    errors={errors}
                    name={name}
                    inputRef={ref}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];
                      if (file instanceof File) {
                        onChange(file);
                        setReceiptFile(URL.createObjectURL(file));
                      }
                    }}
                    accept="*"
                    capture="environment"
                  />
                ) : (
                  <div className="relative w-64 h-40 border rounded-md overflow-hidden group mt-2">
                    <img
                      src={receiptFile}
                      alt="رسید آپلود شده"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-1 rounded z-10"
                      onClick={() => {
                        setReceiptFile(null);
                        onChange(null);
                      }}
                    >
                      حذف عکس
                    </button>
                  </div>
                )}
              </>
            )}
          />
        </div>

        {/* دکمه‌ها */}
        <div className="space-y-4">
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              variant="bordered"
              className="bg-secondary-600 text-white px-4 py-2 "
            >
              {isPending ? <BtnLoader /> : "تایید نهایی ادمین"}
            </Button>

            <Button
              type="button"
              variant="bordered"
              onPress={cancelHandler}
              className="bg-red-600 text-white px-4 py-2 "
            >
              {isCanceling ? <BtnLoader /> : "کنسل کردن رزرو"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminStage4;
