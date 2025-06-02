"use client";
import React, { useState } from "react";
import { reservationDataType, ServiceDetailsType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentVerified } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import { useRejectReserve } from "@/components/template/reservation/hooks/useRejectReserve";
import { Button } from "@heroui/button";
import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";
import RHFInput from "@/components/element/RHFInput";
import BlurModal from "@/components/element/BlurModal";
import { Input } from "@heroui/react";

type AdminStage3 = {
  serviceData: ServiceDetailsType | undefined;
  reserveId: string | null;
  reservationData: reservationDataType;
};

const AdminStage3 = ({
  serviceData,
  reserveId,
  reservationData,
}: AdminStage3) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${reservationData?.payment_image}`;

  const {
    isPending,
    error,
    isError,
    mutateAsync: paymentApproved,
  } = useMutation({
    mutationKey: ["confirm_payment_image"],
    mutationFn: paymentVerified,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admin_description, setAdminDescription] = useState("");
  const queryClient = useQueryClient();
  const { cancelReserve, isCanceling } = useCancelReserve();
  const router = useRouter();
  const { rejectReservePaymentImage, rejecting_payment } = useRejectReserve();

  //admin accept payment_image
  const accepthandler = async () => {
    await paymentApproved({ reserveId, is_payment_verified: true });
    await queryClient.invalidateQueries({ queryKey: ["get-stage", reserveId] });
  };

  const rejectHandler = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    rejectReservePaymentImage({
      reserveId,
      is_payment_verified: false,
      admin_description,
    });
    setIsModalOpen(false);
  };

  if (isError) {
    showToast("خطا در دریافت اطلاعات", "error");
    console.log("error", error);
    return null; // یا یک پیام خطا بصری
  }

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/services");
    });
  };

  return (
    <div className="">
      {/* info section */}
      <div className=" p-6 rounded-md max-w-xl mx-auto">
        <ReserveInfo
          serviceData={serviceData}
          reservationData={reservationData}
          imageUrl={imageUrl}
          isAdminImage={true}
        />
      </div>

      <BlurModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // isPatching={isPatching}
        title="توضیحات عدم تایید"
        heightProp="sm"
        bodyContent={
          <Input
            onChange={(e) => setAdminDescription(e.target.value)}
            placeholder="توضیحات"
          />
        }
        onConfirm={handleConfirm}
        // disabled={isConfirmDisabled}
      />

      <div className="flex gap-3 mt-4 justify-end w-full">
        <div className="flex gap-4 item-center">
          <Button
            variant="bordered"
            onPress={accepthandler}
            className="bg-secondary-500 text-white px-4 py-2 "
          >
            {isPending ? <BtnLoader /> : "تایید "}
          </Button>
          <Button
            variant="bordered"
            onPress={rejectHandler}
            className="bg-red-500 text-white px-4 py-2 "
          >
            {rejecting_payment ? <BtnLoader /> : "عدم تایید"}
          </Button>
        </div>

        <Button
          variant="bordered"
          onPress={cancelHandler}
          className="bg-default-300 text-white px-4 py-2 "
        >
          {isCanceling ? <BtnLoader /> : "لغو رزرو"}
        </Button>
      </div>
    </div>
  );
};

export default AdminStage3;
