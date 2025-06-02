// hooks/useCancelReserve.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/store/useToastSlice";
import { cancleFunc } from "@/services/api/reserve";

export const useCancelReserve = () => {
  const queryClient = useQueryClient();

  const {
    isPending:isCanceling,
    mutateAsync: customerCancle,
  } = useMutation({
    mutationKey: ["cancle-reserve"],
    mutationFn: cancleFunc,
  });

  const cancelReserve = async (
    reserveId: string | null,
    onAfterCancel?: () => void,

  ) => {
    try {
      await customerCancle({ reserveId });
      showToast("رزرو با موفقیت لغو شد", "success");

      await queryClient.invalidateQueries({
        queryKey: ["get-stage", reserveId],
      });

      if (onAfterCancel) onAfterCancel();
    } catch (error) {
        console.log('error',error);
        
      showToast("خطا در لغو رزرو", "error");
    }
  };

  return { cancelReserve ,isCanceling};
};
