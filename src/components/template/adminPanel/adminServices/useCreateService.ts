import { createNewProduct } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateService() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createService } = useMutation({
    mutationFn: createNewProduct,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },


  });

  return { isCreating, createService };
}
