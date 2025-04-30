import { editServiceByID, editServiceImageByID } from "@/services/api/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useEditService() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editService } = useMutation({
    mutationFn: editServiceByID,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },

  });

  return { isEditing, editService };
}


export function useEditServiceImage() {
  const queryClient = useQueryClient();

  const { isPending: isEditingImage, mutateAsync: editServiceImage } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return editServiceImageByID({ id, data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isEditingImage, editServiceImage };
}


