import { useEffect, useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUserAdmin } from "@/services/api/user";
import {
    toPersianNumbers,
    toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useRouter } from "next/navigation";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { findName, findServiceName } from "@/utils/findeName";
import { getAllReserve } from "@/services/api/reserve";
import { getAllServiceAdmin } from "@/services/api/service";
import { ReservesAdmincolumns } from "@/constants/tableData";
import { Reserve } from "@/types";


interface FormattedReserve {
    _id: string;
    id: string;
    name: string;
    phone_number: string;
    service_name: string;
    price: string;
    reserve_duration: string;
    actions: string;
    dateRange: string;
    description: string;
    stage: string;
    status: string;
    payment_status: string;
}

interface GroupedReserves {
    reserveUp: FormattedReserve[];
}

const useReserveData = (visibleColumns: Set<string>) => {
    const router = useRouter();
    const [formData, setFormData] = useState<GroupedReserves>({ reserveUp: [] });
    const [visibleKeys, setVisibleKeys] = useState<string[]>([]);

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

    const groupReservesByKeys = (
        reserves: Reserve[]
    ): GroupedReserves => {
        const filteredReserves = reserves.filter(
            (reserve) => !reserve.is_canceled && !reserve.is_finished
        );

        return filteredReserves.reduce<GroupedReserves>(
            (acc, reserve, index) => {
                const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"} تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

                const name = findName(dataUser ?? [], reserve.user);
                const service_name = findServiceName(dataAllServiceAdmin ?? [], reserve.service);
                const reserve_duration = `${toPersianNumbers(reserve.reserve_duration)} ساعت`;

                const status = reserve.is_canceled
                    ? "لغو شده"
                    : reserve.is_finished
                        ? "تمام شده"
                        : "در حال انتظار";

                const payment_status = reserve.is_payment_verified
                    ? "پرداخت شده"
                    : "در انتظار پرداخت";

                acc.reserveUp.push({
                    _id: toPersianNumbers(index + 1),
                    id: reserve.id,
                    name,
                    phone_number: toPersianNumbers(reserve.user),
                    service_name,
                    price: toPersianNumbersWithComma(reserve.total_price),
                    reserve_duration,
                    actions: reserve.id.toString(),
                    dateRange: dateRanges,
                    description: reserve.admin_description,
                    stage: toPersianNumbers(reserve.stage),
                    status,
                    payment_status,
                });

                return acc;
            },
            { reserveUp: [] }
        );
    };

    useEffect(() => {
        if (
            !isLoadingUser &&
            !isLoadingService &&
            !isLoadingReserve &&
            Array.isArray(dataAllReserveCustomer?.data)
        ) {
            const grouped = groupReservesByKeys(dataAllReserveCustomer.data);
            setFormData(grouped);

            if (grouped.reserveUp.length > 0) {
                setVisibleKeys(Object.keys(grouped.reserveUp[0]));
            }
        }
    }, [
        dataAllReserveCustomer,
        dataUser,
        dataAllServiceAdmin,
        isLoadingUser,
        isLoadingService,
        isLoadingReserve,
    ]);

    const headerColumns = useMemo(() => {
        return visibleColumns.size === ReservesAdmincolumns.length
            ? ReservesAdmincolumns
            : ReservesAdmincolumns.filter((column) =>
                visibleColumns.has(column.uid)
            );
    }, [visibleColumns]);

    const firstActionClickHandler = useCallback(
        (id: string | number) => {
            router.push(`/reservation?reserve-id=${id}`);
        },
        [router]
    );

    const formDataReseves: FormattedReserve[] = Array.isArray(formData.reserveUp)
        ? formData.reserveUp
        : [];

    const isEmpty = !formDataReseves || formDataReseves.length === 0;

    return {
        formDataReseves,
        visibleKeys,
        headerColumns,
        firstActionClickHandler,
        isLoadingReserve,
        isEmpty,
    };
};

export default useReserveData;
