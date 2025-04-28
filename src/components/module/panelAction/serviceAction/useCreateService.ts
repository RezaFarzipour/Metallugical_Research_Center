import { createNewService, createServiceImages } from "@/services/api/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateService() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createService } = useMutation({
    mutationFn: createNewService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isCreating, createService };
}



export function useCreateServiceImages() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingImage, mutateAsync: createServiceImage } = useMutation({
    mutationFn: createServiceImages,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isCreatingImage, createServiceImage };
}
