// "use client"
// import { postReservedService } from '@/services/api/reserve';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import React from 'react'

// const Page = () => {

//     const router = useRouter()

//       //first post request when user click on continue button
//   const { mutateAsync: createServiceReserve, isPending: isCreating } =
//   useMutation({
//     mutationKey: ["post-reserve"],
//     mutationFn: postReservedService,
//   });

//     const handleReserve =async()=>{
//         try {
//             const { id } = await createServiceReserve();
//             router.push(`/reservation?reserve-id=${id}`);
//           } catch (e) {
//             console.log("err", e);
//           }
//     }
//   return (
//     <div>

//       <button onClick={handleReserve} className='border-2 border-black'>رزرو</button>
//     </div>
//   )
// }

// export default Page

"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import {
  Reservescolumns,
  ReservesCustomercolumns,
} from "@/constants/tableData";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import FilteredContainer from "@/components/containers/FilteredContainer";
import CustomeTable from "@/components/module/customeTable/CustomeTable";
import { TbEyeDiscount } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllUserAdmin } from "@/services/api/user";
import {
  getAllServiceAdmin,
  getAllServiceCustomer,
} from "@/services/api/service";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { findName, findServiceName } from "@/utils/findeName";
import { formatDateRangesToPersian2 } from "@/utils/formatter/formatDateRangesToPersian";
import { BtnLoader } from "@/components/element/Loader";
import Empty from "@/components/element/Empty";
import { getAllReserve } from "@/services/api/reserve";
import { useGetUser } from "@/hooks/useAuth";

const ReservesPage: React.FC = () => {
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
      console.log(grouped, "grouped");

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
    <div className="grid grid-cols-1">
      <div className=" p-4 md:p-6">
        <TitleStructureDashboards mainTitle="گزارش ها" />

        <FilteredContainer
          datas={formDataReseves}
          INITIAL_VISIBLE_COLUMNS={visibleKeys}
          columns={ReservesCustomercolumns}
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

export default ReservesPage;
