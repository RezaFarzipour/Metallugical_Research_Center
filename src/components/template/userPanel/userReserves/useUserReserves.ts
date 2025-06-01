import { useEffect, useState, useMemo, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useRouter } from "next/navigation";
import { postReservedService } from "@/services/api/reserve";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { findServiceName } from "@/utils/findeName";
import { ReservesCustomercolumns } from "@/constants/tableData";
import useDataQueries from "@/hooks/useDataQueries";

const useReserveData = (visibleColumns: Set<string>) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ reserveUp: [] });
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const {
    dataAllReserveCustomer,
    isLoadingReserve,
    dataAllServiceCustomer,
    isLoadingServiceCustomer,
  } = useDataQueries();

  const groupReservesByKeys = (reserves) => {
    return reserves.reduce(
      (acc, reserve, index) => {
        const dateRanges = `${
          formatDateRangesToPersian2(reserve.reserve_from) || "?"
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

  //first post request when user click on continue button
  const { mutateAsync: createServiceReserve, isPending: isCreating } =
    useMutation({
      mutationKey: ["post-reserve"],
      mutationFn: postReservedService,
    });

  const handleReserve = async () => {
    try {
      const { id } = await createServiceReserve();
      router.push(`/reservation?reserve-id=${id}`);
    } catch (e) {
      console.log("err", e);
    }
  };
  return {
    formDataReseves,
    visibleKeys,
    headerColumns,
    firstActionClickHandler,
    handleReserve,
    isEmpty,
    isLoadingReserve,
  };
};

export default useReserveData;
