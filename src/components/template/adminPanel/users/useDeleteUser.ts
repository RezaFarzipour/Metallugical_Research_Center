import { deleteUser } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: userDelete } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAll-users"],
      });
    },
  });

  return { userDelete, isDeleting };
}
