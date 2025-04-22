import { getUserProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";


export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });