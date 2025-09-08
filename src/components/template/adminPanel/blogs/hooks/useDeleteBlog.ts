import { deleteBlogById } from "@/services/api/blogs";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/store/useToastSlice";

export function useDeleteBlog() {
  const { isPending: isDeleting, mutateAsync: deleteBLog } = useMutation({
    mutationFn: deleteBlogById,
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "خطا در حذف بلاگ رخ داد";
      showToast(errorMessage, "error");
    },
  });

  return { isDeleting, deleteBLog };
}
