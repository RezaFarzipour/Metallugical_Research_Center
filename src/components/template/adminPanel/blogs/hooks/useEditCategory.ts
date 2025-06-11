import {
  editBlogById,
  editBlogCategoryById,
  editBlogContentById,
} from "@/services/api/blogs";
import { useApolloClient } from "@apollo/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditCategory() {
  const queryClient = useQueryClient();

  const { isPending: isPendingBlogCategory, mutateAsync: editBlogCategory } =
    useMutation({
      mutationFn: ({
        id,
        category_name,
        slug,
      }: {
        id: string;
        category_name: string;
        slug: string;
      }) => {
        return editBlogCategoryById({ id, category_name, slug });
      },
      onSuccess: (data) => {
        console.log(data, "data");

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
      return editBlogById({ id, data });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAll-blogsCategory"],
      });
    },
    onError: (err) => {
      console.log("edit blog error", err);
    },
  });

  return { isPendingBlog, editBlog };
}

export function useEditBlogContent() {
  const client = useApolloClient();

  const { isPending: isPendingBlog, mutateAsync: editBlogContent } =
    useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: {
          content: string;
          blog: string | number;
          index: number;
          class_name: string;
          is_multiline: boolean;
        };
      }) => {
        return editBlogContentById({ id, data });
      },
      onSuccess: async (data) => {
        await client.refetchQueries({
          include: ["getAllBlogs"],
        });
      },
      onError: (err) => {
        console.log("edit blog error", err);
      },
    });

  return { isPendingBlog, editBlogContent };
}
