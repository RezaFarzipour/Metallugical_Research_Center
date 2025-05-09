import { editBlogById, editBlogCategoryById } from "@/services/api/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useEditCategory() {
  const queryClient = useQueryClient();

  const { isPending: isPendingBlogCategory, mutateAsync: editBlogCategory } = useMutation({

    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return editBlogCategoryById({ id, data })
    },
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },

  });

  return { isPendingBlogCategory, editBlogCategory };
}

export function useEditBlog() {
  const queryClient = useQueryClient();

  const { isPending: isPendingBlog, mutateAsync: editBlog } = useMutation({

    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return editBlogById({ id, data })
    },
    onSuccess: (data) => {

      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },

  });

  return { isPendingBlog, editBlog };
}

