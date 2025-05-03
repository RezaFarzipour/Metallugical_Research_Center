
import { createNewBlogCategory } from "@/services/api/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateService() {
    const queryClient = useQueryClient();

    const { isPending: isCategory, mutateAsync: createCategory } = useMutation({
        mutationFn: createNewBlogCategory,
        onSuccess: (data) => {

            queryClient.invalidateQueries({
                queryKey: ["getAll-blogsCategory"],
            });
        },
    });

    return { isCategory, createCategory };
}

