import { editervicesDateRangeById, editServiceByID, editServiceImageByID } from "@/services/api/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useEditCourse() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: editService } = useMutation({
    mutationFn: editServiceByID,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },

  });

  return { isEditing, editService };
}


export function useEditCourseImage() {
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


export function useEditCourseDateRangeById() {
  const queryClient = useQueryClient();

  const { isPending: isEditingDateRange, mutateAsync: editServiceDateRange } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return editervicesDateRangeById({ id, data })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAll-services"],
      });
    },
  });

  return { isEditingDateRange, editServiceDateRange };
}


