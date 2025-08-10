import { ReportsCustomercolumns } from '@/constants/tableData';
import useDataQueries from '@/hooks/useDataQueries';
import { findServiceName } from '@/utils/findeName';
import { formatDateRangesToPersian2 } from '@/utils/formatter/formatDateRangesToPersian';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/formatter/toPersianNumbers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RawReserveData, ReportData, ServiceData } from '@/types';
import { useRouter } from 'next/navigation';
import { useReportsTableStore } from '@/store/useTableSlice';

const useReportsData = () => {
    const [formData, setFormData] = useState<{ reserveUp: ReportData[] }>({ reserveUp: [] });
    const router = useRouter();

    const {
        dataAllReserveCustomer,
        isLoadingReserve,
        dataAllServiceCustomer,
        isLoadingServiceCustomer,
    } = useDataQueries();

    const visibleColumns = useReportsTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useReportsTableStore((state) => state.setVisibleColumns);
    // تایپ‌کستینگ برای داده‌های useDataQueries
    const typedDataAllReserveCustomer = dataAllReserveCustomer as { data: RawReserveData[] } | undefined;
    const typedDataAllServiceCustomer = dataAllServiceCustomer as ServiceData[] | undefined;

    const groupReservesByKeys = (reserves: RawReserveData[]): { reserveUp: ReportData[] } => {
        return reserves.reduce(
            (acc: { reserveUp: ReportData[] }, reserve: RawReserveData,) => {
                if (!reserve.is_canceled && !reserve.is_finished) return acc;

                const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"} تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

                const service_name = findServiceName(typedDataAllServiceCustomer ?? [], reserve.service) || "نامشخص";
                const reserve_duration = `${toPersianNumbers(reserve.reserve_duration)} ساعت`;

                const status = reserve.is_canceled
                    ? "لغو شده"
                    : "تمام شده";

                const payment_status = reserve.is_payment_verified ? "پرداخت شده" : "در انتظار پرداخت";

                acc.reserveUp.push({
                    _id: toPersianNumbers(acc.reserveUp.length + 1),
                    id: reserve.id,
                    name: toPersianNumbers(reserve.user),
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


    const formDataReseves: ReportData[] = Array.isArray(formData.reserveUp) ? formData.reserveUp : [];

    useEffect(() => {
        if (
            !isLoadingServiceCustomer &&
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
        typedDataAllServiceCustomer,
        isLoadingServiceCustomer,
        isLoadingReserve, setVisibleColumns
    ]);
    const firstActionClickHandler = useCallback(
        (id: string | number) => {
            router.push(`/reservation?reserve-id=${id}`);
        },
        [router]
    );
    // محاسبه ستون‌های هدر
    const headerColumns = useMemo(() => {
        return visibleColumns.size === ReportsCustomercolumns.length
            ? ReportsCustomercolumns
            : ReportsCustomercolumns.filter((column) => visibleColumns.has(column.uid));
    }, [visibleColumns]);

    const isEmpty = !formDataReseves || formDataReseves.length === 0;

    return {
        formDataReseves,
        isLoadingReserve,
        headerColumns,
        isEmpty,
        firstActionClickHandler
    };
};

export default useReportsData;