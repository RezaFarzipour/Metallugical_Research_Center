import { editBlogCategoryById } from "@/services/api/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useEditService() {
  const queryClient = useQueryClient();

  const { isPending: isEditingBlogCategory, mutateAsync: editBlogCategory } = useMutation({

    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return editBlogCategoryById({ id, data })
    },
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },

  });

  return { isEditingBlogCategory, editBlogCategory };
}


