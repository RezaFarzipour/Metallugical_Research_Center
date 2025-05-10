// hooks/useCancelReserve.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/store/useToastSlice";
import { PatchRejectStage2, rejectPayment } from "@/services/api/reserve";

export const useRejectReserve = () => {
  const queryClient = useQueryClient();

  const { isPending: isRejecting, mutateAsync: rejectStage2 } = useMutation({
    mutationKey: ["reject-stage2"],
    mutationFn: PatchRejectStage2,
  });


  
  const {
    isPending:rejecting_payment,
    mutateAsync: paymentReject,
  } = useMutation({
    mutationKey: ["reject_payment_image"],
    mutationFn: rejectPayment,
  });

  const rejectReserve =  async ({
    reserveId,
    admin_description,
    service,
  
  }: {
    reserveId: string | null;
    admin_description: string;
    service: string | undefined;

  }) => {
    try {
      await rejectStage2({ reserveId, admin_description, service });
      showToast("رزرو تایید نشد", "success");

      await queryClient.invalidateQueries({
        queryKey: ["get-stage", reserveId],
      });
    } catch (error) {
      showToast("خطا در عدم تایید رزرو", "error");
    }
  };




  const rejectReservePaymentImage =  async ({
    reserveId,
    is_payment_verified
  }: {
    reserveId: string | null;
    is_payment_verified?:boolean | undefined
  }) => {
    try {
      await paymentReject({ reserveId, is_payment_verified });
      showToast("پرداخت تایید نشد", "success");

      await queryClient.invalidateQueries({
        queryKey: ["get-stage", reserveId],
      });
    } catch (error) {
      showToast("خطا در عدم تایید پرداخت", "error");
    }
  };

  return { rejectReserve, isRejecting,rejectReservePaymentImage ,rejecting_payment};
};
