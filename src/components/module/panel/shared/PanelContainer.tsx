"use client";

import React, { useMemo, useState } from "react";
import { useTableStore } from "@/store/useTableSlice";
import TopContent from "@/components/element/panelContent/topContent/TopContent";
import BottomContent from "@/components/element/panelContent/BottomContent";
import CardElement from "@/components/element/cardElement/CardElement";
import CustomeTable from "@/components/element/table/CustomeTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  amount: string;
  date: string;
  title: string;
  description: string;
  image: string;
  author: string;
  articleTitle: string;
}
interface Column {
  name: string;
  uid: string;
  sortable?: boolean;
}
interface PanelContainerProps {
  users: User[];
  columns: Column[];
  INITIAL_VISIBLE_COLUMNS: string[];
  quantity: string;
  firstActionContent: string;
  firstActionIcon?: React.FC;
  secondActionContent: string;
  secondActionIcon?: React.FC;
  topContents?: boolean;
  bottomContents?: boolean;
  btn?: boolean;
  dropDownBtn?: boolean;
  roles: boolean;
  product: boolean;
  viewContent?: boolean;
  image?: boolean;
}

export default function PanelContainer({
  users,
  columns,
  INITIAL_VISIBLE_COLUMNS,
  quantity,
  firstActionContent,
  firstActionIcon,
  secondActionContent,
  secondActionIcon,
  topContents,
  bottomContents,
  btn,
  dropDownBtn,
  roles,
  product,
  viewContent,
  image,
}: PanelContainerProps) {
  const {
    filterValue,
    visibleColumns,
    statusFilter,
    view,
    setView,
    rolesFilter,
    productStatusFilter,
    rowsPerPage,
    sortDescriptor,
    page,
    setPage,
  } = useTableStore();

  React.useEffect(() => {
    useTableStore.setState({
      visibleColumns: new Set(INITIAL_VISIBLE_COLUMNS),
    });
  }, [INITIAL_VISIBLE_COLUMNS]);

  // محاسبه ستون‌های هدر
  const headerColumns = useMemo(() => {
    return visibleColumns.size === columns.length
      ? columns
      : columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  // محاسبه فیلترهای مختلف
  const filteredItems = useMemo<User[]>(() => {
    let filteredUsers = [...users];

    const applyFilter = (
      items: User[],
      filter: string | Set<string>,
      key: keyof User
    ) => {
      if (filter !== "all" && filter instanceof Set) {
        return items.filter((item) => filter.has(item[key] as string));
      }
      return items;
    };

    if (filterValue) {
      const lowerCaseFilter = filterValue.toLowerCase();
      filteredUsers = filteredUsers.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const title = user.title?.toLowerCase() || "";
        return (
          name.includes(lowerCaseFilter) || title.includes(lowerCaseFilter)
        );
      });
    }

    filteredUsers = applyFilter(filteredUsers, statusFilter, "status");
    filteredUsers = applyFilter(filteredUsers, rolesFilter, "role");
    filteredUsers = applyFilter(filteredUsers, productStatusFilter, "status");

    return filteredUsers;
  }, [users, filterValue, statusFilter, rolesFilter, productStatusFilter]);

  // محاسبه تعداد صفحات و آیتم‌های قابل نمایش
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  // مرتب‌سازی آیتم‌ها
  const sortedItems = useMemo(() => {
    return [...paginatedItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof User];
      const second = b[sortDescriptor.column as keyof User];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
  }, [paginatedItems, sortDescriptor]);

  return (
    <div className="">
      {topContents && (
        <TopContent
          usersLength={users.length}
          quantity={quantity}
          btn={btn}
          dropDownBtn={dropDownBtn}
          roles={roles}
          product={product}
          viewContent={viewContent}
        />
      )}
      {!view ? (
        <CustomeTable
          headerColumns={headerColumns}
          sortedItems={sortedItems}
          firstActionContent={firstActionContent}
          firstActionIcon={firstActionIcon}
          secondActionContent={secondActionContent}
          secondActionIcon={secondActionIcon}
          image={image}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <CardElement
            data={sortedItems}
            widthConter="100%"
            heightImg="200px"
            heightConter="150px"
          />
        </div>
      )}

      {bottomContents && (
        <BottomContent page={page} pages={pages} setPage={setPage} />
      )}
    </div>
  );
}
