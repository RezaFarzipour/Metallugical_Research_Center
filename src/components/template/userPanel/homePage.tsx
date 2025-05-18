"use client";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/MiniCardModule";
import { getUserCards } from "@/constants/data";
import { CgArrowLeft } from "react-icons/cg";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import { useTableStore } from "@/store/useTableSlice";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { ReservesCustomercolumns } from "@/constants/tableData";
import { TbEyeDiscount } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceCustomer } from "@/services/api/service";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { findServiceName } from "@/utils/findeName";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import { getAllReserve } from "@/services/api/reserve";
const HomePage: React.FC = () => {
  const { visibleColumns } = useTableStore();
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

  const reserveLength = dataAllReserveCustomer?.data?.length;

  const activeReservations = dataAllReserveCustomer?.data?.filter(
    (item) =>
      item.stage < 6 && item.is_finished === false && item.is_canceled === false
  );

  const activeReservationCount = activeReservations?.length;

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

  const { sortedItems } = useFilteredContainer(formDataReseves);

  const sliecedItems = formDataReseves.slice(0, 4);

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
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <MiniCardModule
          cards={getUserCards(reserveLength, activeReservationCount)}
        />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="آخرین سفارش های من"
        
          href="/user/reports"
          icon={<CgArrowLeft />}
        />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReservesCustomercolumns}
          quantity="گزارش ها"
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={true}
        >
          {isLoadingReserve ? (
            <div>
              <BtnLoader color="#377cfb" />
            </div>
          ) : isEmpty ? (
            <Empty spanValue="رزروی" btn={false} />
          ) : (
            <CustomeTable
              headerColumns={headerColumns}
              sortedItems={sliecedItems}
              firstActionContent="جزئیات"
              firstActionIcon={TbEyeDiscount}
              firstActionClickHandler={firstActionClickHandler}
              image={false}
            />
          )}
        </FilteredContainer>
      </div>
    </div>
  );
};

export default HomePage;
