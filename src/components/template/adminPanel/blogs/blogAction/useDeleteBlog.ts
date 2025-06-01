import { deleteBlogById } from "@/services/api/blogs";
import { useMutation } from "@tanstack/react-query";

export function useDeleteBlog() {
   // const queryClient = useQueryClient();
  
    const { isPending: isDeleting, mutateAsync: deleteBLog } = useMutation({
      mutationFn: deleteBlogById,
      onError:(err)=>{
        console.log("errorr",err)
      }
    //   onSuccess: () => {
  
    //     queryClient.invalidateQueries({
    //       queryKey: ["getAll-blogs"],
    //     });
    //   },
    });
  
    return { isDeleting, deleteBLog };
  }
  