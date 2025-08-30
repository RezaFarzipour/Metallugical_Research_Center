import { deleteServiceById, deleteServiceImageById } from "@/services/api/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteCourse() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: deletService } = useMutation({
    mutationFn: deleteServiceById,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isDeleting, deletService };
}

export function useDeleteCourseImage() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingImage, mutateAsync: deletServiceImage } = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return deleteServiceImageById({ id })
    },
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },

  });

  return { isDeletingImage, deletServiceImage };
}
