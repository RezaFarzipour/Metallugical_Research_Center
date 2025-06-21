import { deleteBlog, deleteBlogCategory } from "@/services/api/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();

  const { isPending: isPendingDeleteCategory, mutateAsync: deletBlogCategory } = useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },
  });

  return { isPendingDeleteCategory, deletBlogCategory };
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  const { isPending: isPendingDeleteBlog, mutateAsync: deletBlogAsync } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },
  });

  return { isPendingDeleteBlog, deletBlogAsync };
}


