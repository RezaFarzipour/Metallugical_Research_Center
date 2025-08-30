
import { ReportsAdmincolumns } from "@/constants/tableData";
import useAdminDataQueries from "@/hooks/useDataQueries";
import { useReportsTableStore } from "@/store/useTableSlice";
import { RawReserveData, ReportData, ServiceData } from "@/types";
import { findName, findServiceName } from "@/utils/findeName";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import {
    toPersianNumbers,
    toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const useReportsData = () => {
    const [formData, setFormData] = useState<{ reserveUp: ReportData[] }>({
        reserveUp: [],
    });

    const router = useRouter();
    const visibleColumns = useReportsTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useReportsTableStore((state) => state.setVisibleColumns);

    const {
        dataUser,
        isLoadingUser,
        dataAllServiceAdmin,
        isLoadingService,
        dataAllReserveCustomer,
        isLoadingReserve,
    } = useAdminDataQueries();

    const typedDataAllServiceAdmin = dataAllServiceAdmin as ServiceData[] | undefined;
    const typedDataAllReserveCustomer = dataAllReserveCustomer as
        | { data: RawReserveData[] }
        | undefined;

    const groupReservesByKeys = (
        reserves: RawReserveData[]
    ): { reserveUp: ReportData[] } => {
        return reserves.reduce(
            (acc: { reserveUp: ReportData[] }, reserve: RawReserveData) => {
                const isCancelled = reserve.is_canceled;
                const isFinished = reserve.is_finished;

                if (!isCancelled && !isFinished) return acc;

                const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"} تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;
                const name = findName(dataUser, reserve.user) || "نامشخص";
                const service_name =
                    findServiceName(typedDataAllServiceAdmin ?? [], reserve.service) || "نامشخص";
                const reserve_duration = `${toPersianNumbers(reserve.reserve_duration)} ساعت`;

                const status = isCancelled
                    ? "لغو شده"
                    : isFinished
                        ? "تمام شده"
                        : "در حال انتظار";

                const payment_status = reserve.is_payment_verified
                    ? "پرداخت شده"
                    : "در انتظار پرداخت";

                acc.reserveUp.push({
                    _id: toPersianNumbers(acc.reserveUp.length + 1),
                    id: reserve.id,
                    name,
                    phone_number: toPersianNumbers(reserve.user),
                    service_name,
                    price: toPersianNumbersWithComma(reserve.total_price),
                    reserve_duration,
                    dateRange: dateRanges,
                    admin_description: reserve.admin_description,
                    stage: toPersianNumbers(reserve.stage),
                    status,
                    payment_status,
                    actions: reserve.id.toString(),
                });

                return acc;
            },
            { reserveUp: [] }
        );
    };

    const formDataReseves: ReportData[] = Array.isArray(formData.reserveUp)
        ? formData.reserveUp
        : [];

    useEffect(() => {
        if (
            !isLoadingUser &&
            !isLoadingService &&
            !isLoadingReserve &&
            Array.isArray(typedDataAllReserveCustomer?.data)
        ) {
            const grouped = groupReservesByKeys(typedDataAllReserveCustomer.data);
            setFormData(grouped);

            if (grouped.reserveUp.length > 0) {
                const keys = Object.keys(grouped.reserveUp[0]);
                setVisibleColumns(new Set(keys));
            }
        }
    }, [
        typedDataAllReserveCustomer,
        typedDataAllServiceAdmin,
        isLoadingUser,
        isLoadingService,
        isLoadingReserve,
        setVisibleColumns,
    ]);

    const firstActionClickHandler = useCallback(
        (id: string | number) => {
            router.push(`/reservation?reserve-id=${id}`);
        },
        [router]
    );

    const headerColumns = useMemo(() => {
        return visibleColumns.size === ReportsAdmincolumns.length
            ? ReportsAdmincolumns
            : ReportsAdmincolumns.filter((column) =>
                visibleColumns.has(column.uid)
            );
    }, [visibleColumns]);

    const isEmpty = !formDataReseves || formDataReseves.length === 0;

    return {
        formDataReseves,
        headerColumns,
        isLoadingReserve,
        isEmpty,
        firstActionClickHandler,
    };
};

export default useReportsData;
