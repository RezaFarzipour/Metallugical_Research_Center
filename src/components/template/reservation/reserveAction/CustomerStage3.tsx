"use client";

import BtnLoader from "@/components/element/BtnLoader";
import FileInput from "@/components/element/FileInput";
import { useCancelReserve } from "@/hooks/useCancelReserve";
import {
  PaymentFormData,
  paymentImageSchema,
} from "@/schemas/payment_ImageSchema";
import { sendReceipt } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type CustomerStage3Props = {
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  data: reservationDataType;
};

const CustomerStage3 = ({
  serviceData,
  reserveId,
  data: reservationData,
}: CustomerStage3Props) => {
  const [receiptFile, setReceiptFile] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { cancelReserve, isCanceling } = useCancelReserve();

  const router = useRouter();
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

  const { isPending: isSending, mutateAsync: sendImage } = useMutation({
    mutationKey: ["send-image"],
    mutationFn: sendReceipt,
  });


  //accept by admin

  const onSubmit = async (data: PaymentFormData) => {
    if (!data.payment_image) return;

    const formData = new FormData();
    formData.append("payment_image", data.payment_image);
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

  //reject by admin

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="w-full container rounded-xl h-auto  bg-white p-4 [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px]">
      <p className="font-bold text-md my-3">اطلاعات رزرو</p>

      <div className="flex items-center gap-4">
        {/* reserve info */}
        <div className="bg-blue-50 p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-lg font-bold mb-4">اطلاعات رزرو</h2>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="font-medium">نام سرویس:</div>
            <div>{serviceData?.data?.service_name || "نامشخص"}</div>

            <div className="font-medium">توضیحات سرویس</div>
            <div>{serviceData?.data.description || "نامشخص"}</div>

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
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex justify-center items-center">
          <Controller
            name="payment_image"
            control={control}
            render={({ field: { value, onChange, ...rest } }) => (
              <>
                {!receiptFile ? (
                  <FileInput
                    multiple={false}
                    label="فیش واریز"
                    errors={errors}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        onChange(file);
                        setReceiptFile(URL.createObjectURL(file)); // ذخیره‌ی آدرس تصویر
                      }
                    }}
                    {...rest}
                  />
                ) : (
                  <div className="relative w-64 h-40 border rounded-md overflow-hidden group mt-2">
                    <Image
                      src={receiptFile}
                      alt="فیش واریز"
                      layout="fill"
                      objectFit="cover"
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
          

          <div className="flex gap-3 mt-4">
            <Button
             variant="bordered"
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isSending ? <BtnLoader /> : "ارسال"}
            </Button>
            <Button
             variant="bordered"
              onPress={cancelHandler}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
             {isCanceling ?<BtnLoader /> : "لغو رزرو"}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CustomerStage3;
