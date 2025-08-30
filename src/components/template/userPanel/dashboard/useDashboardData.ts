import { userCards } from "@/constants/data";
import { ReservesCustomercolumns } from "@/constants/tableData";
import useDataQueries from "@/hooks/useDataQueries";
import { findServiceName } from "@/utils/findeName";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RawReserveData, ReportData, ServiceData } from "@/types";
import { useReservesTableStore } from "@/store/useTableSlice";

const useDashboardData = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ reserveUp: ReportData[] }>({ reserveUp: [] });

  const {
    dataAllReserveCustomer,
    isLoadingReserve,
    dataAllServiceCustomer,
    isLoadingServiceCustomer,
  } = useDataQueries();

  // خواندن و تنظیم ستون‌ها از Zustand
  const visibleColumns = useReservesTableStore((state) => state.visibleColumns);
  const setVisibleColumns = useReservesTableStore((state) => state.setVisibleColumns);

  // تایپ‌کستینگ برای داده‌های useDataQueries
  const typedDataAllReserveCustomer = dataAllReserveCustomer as { data: RawReserveData[] } | undefined;
  const typedDataAllServiceCustomer = dataAllServiceCustomer as ServiceData[] | undefined;

  const groupReservesByKeys = (reserves: RawReserveData[]): { reserveUp: ReportData[] } => {
    return reserves.reduce(
      (acc: { reserveUp: ReportData[] }, reserve: RawReserveData, index: number) => {
        const dateRanges = `${formatDateRangesToPersian2(reserve.reserve_from) || "?"} تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

        const service_name = findServiceName(typedDataAllServiceCustomer ?? [], reserve.service) || "نامشخص";
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
          name: toPersianNumbers(reserve.user), // فرض می‌کنیم user یک شماره تلفن است
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
        // به جای setVisibleKeys محلی، مقدار ستون‌ها را در Zustand ست می‌کنیم
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
  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === ReservesCustomercolumns.length
      ? ReservesCustomercolumns
      : ReservesCustomercolumns.filter((column) =>
        visibleColumns.has(column.uid)
      );
  }, [visibleColumns]);

  const firstActionClickHandler = useCallback(
    (id: string | number) => {
      router.push(`/reservation?reserve-id=${id}`);
    },
    [router]
  );

  const isEmpty = !formDataReseves || formDataReseves.length === 0;

  const reserveLength = dataAllReserveCustomer?.data?.length;

  const activeReservations = dataAllReserveCustomer?.data?.filter(
    (item: any) =>
      item.stage < 6 && !item.is_finished && !item.is_canceled
  );
  const activeReservationCount = activeReservations?.length;
  const cancelReservations = dataAllReserveCustomer?.data?.filter(
    (item: any) =>
      item.stage < 6 && !item.is_finished && item.is_canceled
  );
  const cancelReservationCount = cancelReservations?.length;


  const cardsWithCounts = {
    cancelReserve: { ...userCards.cancelReservation, count: cancelReservationCount },
    activeReserve: { ...userCards.activeReservation, count: activeReservationCount },
    lengthReserve: { ...userCards.reserves, count: reserveLength },
  };

  const sliecedItems = formDataReseves.slice(-4);

  return {
    formDataReseves,

    headerColumns,
    firstActionClickHandler,
    isEmpty,
    isLoadingReserve,
    sliecedItems,
    cardsWithCounts
  };
};

export default useDashboardData;
