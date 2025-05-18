import { createNewService, createServiceDateRange, createServiceImages } from "@/services/api/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateService() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createService } = useMutation({
    mutationFn: createNewService,
    onSuccess: () => {

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
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isCreatingImage, createServiceImage };
}
export function useCreateServiceDateRange() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingDateRange, mutateAsync: createDateRange } = useMutation({
    mutationFn: createServiceDateRange,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isCreatingDateRange, createDateRange };
}