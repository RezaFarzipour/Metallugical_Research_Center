import { ReservesCustomercolumns } from "@/constants/tableData";
import { getAllReserve } from "@/services/api/reserve";
import { getAllServiceCustomer } from "@/services/api/service";
import { findServiceName } from "@/utils/findeName";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const useDashboardData = (visibleColumns: Set<string>) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ reserveUp: [] });
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);

  const { data: dataAllServiceAdmin, isLoading: isLoadingService } = useQuery({
    queryKey: ["getAll-services"],
    queryFn: getAllServiceCustomer,
  });

  const { data: dataAllReserveCustomer, isLoading: isLoadingReserve } =
    useQuery({
      queryKey: ["get-Allreserve"],
      queryFn: getAllReserve,
    });

  const groupReservesByKeys = (reserves) => {
    return reserves.reduce(
      (acc, reserve, index) => {
        const dateRanges = `${
          formatDateRangesToPersian2(reserve.reserve_from) || "?"
        } تا ${formatDateRangesToPersian2(reserve.reserve_to) || "?"}`;

        const service_name = findServiceName(
          dataAllServiceAdmin ?? [],
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
          actions: reserve.id.toString(),
          dateRange: dateRanges,
          admin_description: reserve.admin_description,
          stage: reserve.stage,
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
    isLoadingService,
    isLoadingReserve,
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
    (item) =>
      item.stage < 6 && item.is_finished === false && item.is_canceled === false
  );

  const activeReservationCount = activeReservations?.length;
  const sliecedItems = formDataReseves.slice(0, 4);

  return {
    formDataReseves,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    isEmpty,
    isLoadingReserve,
    reserveLength,
    activeReservationCount,
    sliecedItems,
  };
};

export default useDashboardData;
