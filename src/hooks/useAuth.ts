import { getUserProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
 const{data} =  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
  });

  return data
};
