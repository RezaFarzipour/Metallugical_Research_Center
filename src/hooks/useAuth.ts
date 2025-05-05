import { getUserProfile } from "@/services/api/auth";
import { useQuery } from "@tanstack/react-query";


export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    select: (response) => response?.response?.data[0],

  }

  );
