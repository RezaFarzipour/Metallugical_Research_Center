"use client";

import FileInput from "@/components/element/FileInput";
import { BtnLoader } from "@/components/element/Loader";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import {
  PaymentFormData,
  paymentImageSchema,
} from "@/schemas/payment_ImageSchema";
import { sendReceipt } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReserveInfo from "@/components/module/ReserveInfo";

type CustomerStage3Props = {
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  reservationData: reservationDataType;
};

const CustomerStage3 = ({
  serviceData,
  reserveId,
  reservationData,
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
    <div className="">
      <ReserveInfo
        serviceData={serviceData}
        reservationData={reservationData}
      />

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
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          onChange(file);
                          setReceiptFile(URL.createObjectURL(file)); // ذخیره‌ی آدرس تصویر
                        }
                      }}
                      accept="image/*"
                      capture="environment"
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

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="bordered"
              type="submit"
              className="bg-secondary-500 text-white px-4 py-2 "
            >
              {isSending ? <BtnLoader /> : "ارسال"}
            </Button>
            <Button
              variant="bordered"
              onPress={cancelHandler}
              className="bg-red-500 text-white px-4 py-2 "
            >
              {isCanceling ? <BtnLoader /> : "لغو رزرو"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerStage3;
