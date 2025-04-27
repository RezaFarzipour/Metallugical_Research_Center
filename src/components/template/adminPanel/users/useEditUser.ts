import { editUserByPhoneNumberAdmin } from "@/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUserService() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutateAsync: userEdit } = useMutation({
    mutationKey: ["edit-user"],
    mutationFn: editUserByPhoneNumberAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAll-users"],
      });
    },
  });

  return { isEditing, userEdit };
}
