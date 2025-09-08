"use client";
import React, { useState } from "react";
import { reservationDataType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentVerified } from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { useCancelReserve } from "@/components/template/reservation/hooks/useCancelReserve";
import { useRouter } from "next/navigation";
import { useRejectReserve } from "@/components/template/reservation/hooks/useRejectReserve";
import { Button } from "@heroui/button";
import { BtnLoader } from "@/components/element/Loader";
import ReserveInfo from "@/components/module/ReserveInfo";
import BlurModal from "@/components/element/BlurModal";
import { Input } from "@heroui/react";
import { ServiceDetailsType } from "@/types/serviceType";
import { IoMdDownload } from "react-icons/io";

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
  const imageUrl = reservationData?.payment_image;

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
    const errorMessage =
      (error as any)?.response?.data?.message ||
      (error as any)?.message ||
      "خطا در دریافت اطلاعات";
    showToast(errorMessage, "error");
    return null; // یا می‌تونی یه UI مخصوص خطا برگردونی
  }

  //cancle reserve
  const cancelHandler = () => {
    cancelReserve(reserveId, () => {
      router.push("/admin/reservse");
    });
  };

  const handleDownload = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "receipt.jpg");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error: any) {
      const errorMessage = error?.message || "دانلود فایل ناموفق بود";
      showToast(errorMessage, "error");
    }
  };
  return (
    <div>
      {/* info section */}
      <div className=" p-6 rounded-md max-w-xl mx-auto">
        <ReserveInfo
          serviceData={serviceData}
          reservationData={reservationData}
          imageUrl={imageUrl}
          isAdminImage={true}
        />
      </div>

      <div className="flex justify-center items-center">
        <Button
          variant="bordered"
          onPress={() =>
            handleDownload(
              `/api/downloadImage?url=${encodeURIComponent(imageUrl)}`
            )
          }
          className="flex items-center gap-2 text-default-500 px-5 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <IoMdDownload size={20} />
          دانلود فیش واریز
        </Button>
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

      <div className="flex gap-3 mt-4 justify-center w-full">
        <div className="flex gap-4 item-center">
          <Button
            variant="faded"
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
          variant="faded"
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
