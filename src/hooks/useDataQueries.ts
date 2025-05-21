import { getAllReserve } from "@/services/api/reserve";
import { getAllServiceAdmin, getAllServiceCustomer } from "@/services/api/service";
import { getAllUserAdmin } from "@/services/api/user";
import { useQuery } from "@tanstack/react-query";


export default function useDataQueries() {
    const {
        data: dataUser,
        isPending: isLoadingUser,
    } = useQuery({
        queryKey: ["getAll-users"],
        queryFn: getAllUserAdmin,
    });

    const {
        data: dataAllServiceAdmin,
        isPending: isLoadingService,
    } = useQuery({
        queryKey: ["getAll-services"],
        queryFn: getAllServiceAdmin,
    });

    const {
        data: dataAllReserveCustomer,
        isPending: isLoadingReserve,
    } = useQuery({
        queryKey: ["get-Allreserve"],
        queryFn: getAllReserve,
    });

    const { data: dataAllServiceCustomer, isPending: isLoadingServiceCustomer } = useQuery({
        queryKey: ["getAll-services"],
        queryFn: getAllServiceCustomer,
    });

    return {
        dataUser,
        isLoadingUser,
        dataAllServiceAdmin,
        isLoadingService,
        dataAllReserveCustomer,
        isLoadingReserve,
        dataAllServiceCustomer,
        isLoadingServiceCustomer

    };
}
