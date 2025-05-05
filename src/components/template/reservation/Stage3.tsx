"use client";

import BtnLoader from "@/components/element/BtnLoader";
import FileInput from "@/components/element/FileInput";
import {
  PaymentFormData,
  paymentImageSchema,
} from "@/schemas/payment_ImageSchema";
import { sendReceipt } from "@/services/api/service";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  role: "customer" | "admin";
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  setStage:(stage: number)=>void,
  data:reservationDataType
};

const Stage3 = ({ role, serviceData, reserveId ,setStage,data:reservationData}: Props) => {
  const [receiptFile, setReceiptFile] = useState<string | null>(null);

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

  const {
    isPending: isSending,
    mutateAsync: sendImage,
    error,
    
  } = useMutation({
    mutationKey: ["send-image"],
    mutationFn: sendReceipt,
  });

  const onSubmit = async (data: PaymentFormData) => {
    if (!data.payment_image) return;

    const formData = new FormData();
    formData.append("payment_image", data.payment_image);
    await sendImage({ reserveId, data: formData });
    setStage(reservationData?.stage)
  };

  const rejecthandler = () => {};

  if (role === "admin") {
    return (
      <div className="p-4 border rounded bg-yellow-50 text-center">
        <p>در انتظار آپلود فیش پرداخت توسط کاربر...</p>
      </div>
    );
  }

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
            <strong>توضیحات:</strong> {serviceData?.data?.description}
          </p>
          <p>
            <strong>قیمت:</strong> {serviceData?.data?.price?.toLocaleString()}{" "}
            تومان
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
                    setReceiptFile(URL.createObjectURL(file));
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
              onClick={rejecthandler}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              کنسل
            </button>
          </div>
        </form>

        <h1>{receiptFile}</h1>
      </div>
    </div>
  );
};

export default Stage3;
