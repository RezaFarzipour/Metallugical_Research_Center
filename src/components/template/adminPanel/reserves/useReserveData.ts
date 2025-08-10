
import { useEffect, useMemo, useCallback, useState } from "react";
import {
    toPersianNumbers,
    toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useRouter } from "next/navigation";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { findName, findServiceName } from "@/utils/findeName";
import { ReservesAdmincolumns } from "@/constants/tableData";
import { Reserve } from "@/types";
import useDataQueries from "@/hooks/useDataQueries";
import { useReservesTableStore } from "@/store/useTableSlice";

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
    admin_description: string;
    stage: string;
    status: string;
    payment_status: string;
}

interface GroupedReserves {
    reserveUp: FormattedReserve[];
}

const useReserveData = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<GroupedReserves>({ reserveUp: [] });

    // خواندن و تنظیم ستون‌ها از Zustand
    const visibleColumns = useReservesTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useReservesTableStore((state) => state.setVisibleColumns);

    const {
        dataUser,
        isLoadingUser,
        dataAllServiceAdmin,
        isLoadingService,
        dataAllReserveCustomer,
        isLoadingReserve,
    } = useDataQueries();

    const groupReservesByKeys = (reserves: Reserve[]): GroupedReserves => {
        const filteredReserves = reserves.filter(
            (reserve) => !reserve.is_canceled && !reserve.is_finished
        );

        return filteredReserves.reduce<GroupedReserves>((acc, reserve, index) => {
            const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"} تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"
                }`;

            const name = findName(dataUser ?? [], reserve.user) || "نامشخص";
            const service_name =
                findServiceName(dataAllServiceAdmin ?? [], reserve.service) || "نامشخص";
            const reserve_duration = `${toPersianNumbers(reserve.reserve_duration)} ساعت`;

            const status = reserve.is_canceled
                ? "لغو شده"
                : reserve.is_finished
                    ? "تمام شده"
                    : "در حال انتظار";

            const payment_status = reserve.is_payment_verified ? "پرداخت شده" : "در انتظار پرداخت";

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
                admin_description: reserve.admin_description,
                stage: toPersianNumbers(reserve.stage),
                status,
                payment_status,
            });

            return acc;
        }, { reserveUp: [] });
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
                // به جای setVisibleKeys محلی، مقدار ستون‌ها را در Zustand ست می‌کنیم
                const keys = Object.keys(grouped.reserveUp[0]);
                setVisibleColumns(new Set(keys));
            }
        }
    }, [
        dataAllReserveCustomer,
        dataUser,
        dataAllServiceAdmin,
        isLoadingUser,
        isLoadingService,
        isLoadingReserve,
        setVisibleColumns,
    ]);

    // ستون‌هایی که باید نمایش داده شوند
    const headerColumns = useMemo(() => {
        return visibleColumns.size === ReservesAdmincolumns.length
            ? ReservesAdmincolumns
            : ReservesAdmincolumns.filter((column) => visibleColumns.has(column.uid));
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
        headerColumns,
        firstActionClickHandler,
        isLoadingReserve,
        isEmpty,
    };
};

export default useReserveData;
