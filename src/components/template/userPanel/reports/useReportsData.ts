import { ReportsCustomercolumns } from '@/constants/tableData';
import useDataQueries from '@/hooks/useDataQueries';
import { findServiceName } from '@/utils/findeName';
import { formatDateRangesToPersian2 } from '@/utils/formatter/formatDateRangesToPersian';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/formatter/toPersianNumbers';
import { useEffect, useMemo, useState } from 'react'

const useReportsData = (visibleColumns: Set<string>) => {
    const [formData, setFormData] = useState({ reserveUp: [] });
    const [visibleKeys, setVisibleKeys] = useState<string[]>([]);

    const {
        dataAllReserveCustomer,
        isLoadingReserve,
        dataAllServiceCustomer,
        isLoadingServiceCustomer
    } = useDataQueries();

    const groupReservesByKeys = (reserves) => {
        return reserves.reduce(
            (acc, reserve, index) => {
                const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"
                    } تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

                const service_name = findServiceName(
                    dataAllServiceCustomer ?? [],
                    reserve.service
                );
                const reserve_duration = `${toPersianNumbers(
                    reserve.reserve_duration
                )} ساعت`;

                const status =
                    reserve.is_canceled === true
                        ? "لغو شده"
                        : reserve.is_finished === true
                            ? "تمام شده"
                            : "در حال انتظار";
                const payment_status =
                    reserve.is_payment_verified === true
                        ? "پرداخت شده"
                        : "در انتظار پرداخت";

                acc.reserveUp.push({
                    _id: toPersianNumbers(index + 1),
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
                });

                return acc;
            },
            { reserveUp: [] }
        );
    };

    const formDataReseves = Array.isArray(formData.reserveUp)
        ? formData.reserveUp
        : [];

    useEffect(() => {
        if (
            !isLoadingServiceCustomer &&
            !isLoadingReserve &&
            Array.isArray(dataAllReserveCustomer.data)
        ) {
            const grouped = groupReservesByKeys(dataAllReserveCustomer.data);
            setFormData(grouped);

            if (grouped.reserveUp.length > 0) {
                setVisibleKeys(Object.keys(grouped.reserveUp[0]));
            }
        }
    }, [
        dataAllReserveCustomer,
        dataAllServiceCustomer,
        isLoadingServiceCustomer,
        isLoadingReserve,
    ]);
    // محاسبه ستون‌های هدر
    const headerColumns = useMemo(() => {
        return visibleColumns.size === ReportsCustomercolumns.length
            ? ReportsCustomercolumns
            : ReportsCustomercolumns.filter((column) =>
                visibleColumns.has(column.uid)
            );
    }, [visibleColumns]);

    const isEmpty = !formDataReseves || formDataReseves.length === 0;

    return {
        formDataReseves,
        isLoadingReserve,
        visibleKeys,
        headerColumns,
        isEmpty,
    };
}

export default useReportsData   