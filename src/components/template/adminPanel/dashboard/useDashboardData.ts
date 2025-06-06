"use client"
import { adminCards } from '@/constants/data';
import { ReservesAdmincolumns } from '@/constants/tableData';
import useDataQueries from '@/hooks/useDataQueries';
import { findName, findServiceName } from '@/utils/findeName';
import { formatDateRangesToPersian2 } from '@/utils/formatter/formatDateRangesToPersian';
import { toPersianNumbers, toPersianNumbersWithComma } from '@/utils/formatter/toPersianNumbers';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react'

const useDashboardData = (visibleColumns: Set<string>, cardsData) => {
    const router = useRouter();
    const [formData, setFormData] = useState({ reserveUp: [] });
    const [visibleKeys, setVisibleKeys] = useState<string[]>([]);

    const {
        dataUser,
        isLoadingUser,
        dataAllServiceAdmin,
        isLoadingService,
        dataAllReserveCustomer,
        isLoadingReserve,
    } = useDataQueries();
    const {
        numberOfUsers,
        numberOfServices,
        numberOfReservations,
        numberOfBlogs,
    } = cardsData;

    const groupReservesByKeys = (reserves) => {
        return reserves.reduce(
            (acc, reserve, index) => {
                const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"
                    } تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

                const name = findName(dataUser ?? [], reserve.user);
                const service_name = findServiceName(dataAllServiceAdmin ?? [], reserve.service);
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
        dataAllServiceAdmin,
        isLoadingUser,
        isLoadingService,
        isLoadingReserve,
    ]);

    const formDataReseves = Array.isArray(formData.reserveUp)
        ? formData.reserveUp
        : [];
    console.log(formDataReseves, "formDataReseves");

    const slicedItems = formDataReseves.slice(-4);
    // محاسبه ستون‌های هدر
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


    const cardsWithCounts = {
        users: { ...adminCards.users, count: numberOfUsers },
        orders: { ...adminCards.orders, count: numberOfServices },
        products: { ...adminCards.products, count: numberOfReservations },
        blogs: { ...adminCards.blogs, count: numberOfBlogs },
    };

    return {
        formDataReseves,
        visibleKeys,
        headerColumns,
        firstActionClickHandler,
        isLoadingReserve,
        slicedItems, cardsWithCounts
    };
}

export default useDashboardData