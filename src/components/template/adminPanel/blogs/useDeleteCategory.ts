import { deleteBlogCategory } from "@/services/api/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteService() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingBlogCategory, mutateAsync: deletBlogCategory } = useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },
  });

  return { isDeletingBlogCategory, deletBlogCategory };
}

