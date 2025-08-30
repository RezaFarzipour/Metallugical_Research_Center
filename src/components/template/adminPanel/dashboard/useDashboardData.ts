
"use client";
import { adminCards } from '@/constants/data';
import { ReservesAdmincolumns } from '@/constants/tableData';
import useDataQueries from '@/hooks/useDataQueries';
import { useReportsTableStore } from '@/store/useTableSlice';
import { CardsData, RawReserveData, ReportData, ServiceData } from '@/types';
import { findName, findServiceName } from '@/utils/findeName';
import { formatDateRangesToPersian2 } from '@/utils/formatter/formatDateRangesToPersian';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/formatter/toPersianNumbers';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useDashboardData = (cardsData: CardsData) => {
    const router = useRouter();
    const [formData, setFormData] = useState<{ reserveUp: ReportData[] }>({ reserveUp: [] });

    const {
        dataUser,
        isLoadingUser,
        dataAllServiceAdmin,
        isLoadingService,
        dataAllReserveCustomer,
        isLoadingReserve,
    } = useDataQueries();

    // گرفتن و ست کردن ستون‌های قابل مشاهده از zustand
    const visibleColumns = useReportsTableStore((state) => state.visibleColumns);
    const setVisibleColumns = useReportsTableStore((state) => state.setVisibleColumns);

    const typedDataAllServiceAdmin = dataAllServiceAdmin as ServiceData[] | undefined;
    const typedDataAllReserveCustomer = dataAllReserveCustomer as { data: RawReserveData[] } | undefined;

    const groupReservesByKeys = (reserves: RawReserveData[]): { reserveUp: ReportData[] } => {
        return reserves.reduce(
            (acc: { reserveUp: ReportData[] }, reserve: RawReserveData, index: number) => {
                const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"} تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

                const name = findName(dataUser, reserve.user) || "نامشخص";
                const service_name = findServiceName(typedDataAllServiceAdmin ?? [], reserve.service) || "نامشخص";
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
            },
            { reserveUp: [] }
        );
    };

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
                // ستون‌ها را به zustand منتقل کن
                const keys = Object.keys(grouped.reserveUp[0]);
                setVisibleColumns(new Set(keys));
            }
        }
    }, [
        typedDataAllReserveCustomer,
        dataUser,
        typedDataAllServiceAdmin,
        isLoadingUser,
        isLoadingService,
        isLoadingReserve,
        setVisibleColumns,
    ]);

    const formDataReseves: ReportData[] = Array.isArray(formData.reserveUp) ? formData.reserveUp : [];

    const slicedItems = formDataReseves.slice(-4);

    // ستون‌های هدر فقط ستون‌های visibleColumns را نشان می‌دهد
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

    const cardsWithCounts = {
        users: { ...adminCards.users, count: cardsData.numberOfUsers },
        orders: { ...adminCards.orders, count: cardsData.numberOfServices },
        products: { ...adminCards.products, count: cardsData.numberOfReservations },
        blogs: { ...adminCards.blogs, count: cardsData.numberOfBlogs },
    };

    return {
        formDataReseves,
        headerColumns,
        firstActionClickHandler,
        isLoadingReserve,
        slicedItems,
        cardsWithCounts,
    };
};

export default useDashboardData;
