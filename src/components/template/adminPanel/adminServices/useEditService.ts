import { editNewProduct } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function useEditService() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editService } = useMutation({
    mutationFn: editNewProduct,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },

  });

  return { isEditing, editService };
}
