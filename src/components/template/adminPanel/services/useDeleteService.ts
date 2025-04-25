import { deleteNewProduct } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useDeleteService() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: deletService } = useMutation({
    mutationFn: deleteNewProduct,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },

  });

  return { isDeleting, deletService };
}
