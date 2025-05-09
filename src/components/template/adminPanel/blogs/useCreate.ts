
import { createNewBlog, createNewBlogCategory } from "@/services/api/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
    const queryClient = useQueryClient();

    const { isPending: isPendingCategory, mutateAsync: createCategory } = useMutation({
        mutationFn: createNewBlogCategory,
        onSuccess: (data) => {

            queryClient.invalidateQueries({
                queryKey: ["getAll-blogsCategory"],
            });
        },
    });

    return { isPendingCategory, createCategory };
}

export function useCreateBlog() {
    const queryClient = useQueryClient();

    const { isPending: isPendingBlog, mutateAsync: createBlog } = useMutation({
        mutationFn: createNewBlog,

        onSuccess: (data) => {

            queryClient.invalidateQueries({
                queryKey: ["getAll-blogs"],
            });
        },
    });

    return { isPendingBlog, createBlog };
}


