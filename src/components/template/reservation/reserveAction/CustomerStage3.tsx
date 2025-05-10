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
    <div className="p-4 border rounded space-y-4">
      <h2 className="text-lg font-semibold">اطلاعات دستگاه</h2>
      <div className="flex items-center gap-4">
        {serviceData?.data?.cover_image ? (
          <Image
            src={serviceData?.data?.cover_image}
            width={400}
            height={400}
            alt={serviceData?.data?.service_name}
            className="w-32 h-32 object-cover rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
            بدون تصویر
          </div>
        )}

        <div>
          <p>
            <strong>نام دستگاه:</strong> {serviceData?.data?.service_name}
          </p>
          <p>
            <strong>ساعت:</strong> {reservationData.reserve_duration}
          </p>
          <p>
            <strong>قیمت:</strong>{" "}
            {reservationData?.total_price.toLocaleString()} تومان
          </p>
          <p>
            <strong>توضیحات ادمین:</strong> {reservationData.admin_description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="payment_image"
            control={control}
            render={({ field: { value, onChange, ...rest } }) => (
              <FileInput
                multiple={false}
                label="فیش واریز"
                errors={errors}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onChange(file);
                    setReceiptFile(URL.createObjectURL(file)); // Store file URL
                  }
                }}
                {...rest}
              />
            )}
          />

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {isSending ? <BtnLoader /> : "ارسال"}
            </button>
            <button
              onClick={cancelHandler}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              کنسل
            </button>

            {/* Optional: Previous step button */}
            {/* <button
              onClick={cancelHandler}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              مرحله ی قبل
            </button> */}
          </div>
        </form>

        {/* نمایش فیش واریز */}
        <h1>{receiptFile}</h1>
      </div>
    </div>
  );
};

export default CustomerStage3;
