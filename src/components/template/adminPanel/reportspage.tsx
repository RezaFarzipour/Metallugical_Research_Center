"use client";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { ReportsCustomercolumns } from "@/constants/tableData";
import React, { useEffect, useMemo, useState } from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
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
import { useQuery } from "@tanstack/react-query";

const ReportsPage: React.FC = () => {
  const { visibleColumns } = useTableStore();
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

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === ReportsCustomercolumns.length
      ? ReportsCustomercolumns
      : ReportsCustomercolumns.filter((column) =>
          visibleColumns.has(column.uid)
        );
  }, [visibleColumns]);

  const isEmpty = !formDataReseves || formDataReseves.length === 0;

  return (
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="گزارش ها" />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReportsCustomercolumns}
          quantity="گزارش ها"
          topContents={!!formDataReseves?.length}
          viewContent={false}
          viewContentSmSize={false}
          addBtn={false}
          columnsDropDownBtn={true}
          rolesDropDown={false}
          stausDropDown={true}
          bottomContents={!!formDataReseves?.length}
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
              sortedItems={sortedItems}
              image={false}
            />
          )}
        </FilteredContainer>
      </div>
    </div>
  );
};

export default ReportsPage;
