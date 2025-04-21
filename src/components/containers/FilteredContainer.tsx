"use client";

import React from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import TopContent from "../module/filterdContent/topContent/TopContent";
import BottomContent from "../module/filterdContent/BottomContent";



// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status: string;
//   amount: string;
//   date: string;
//   title: string;
//   description: string;
//   image: string;
//   author: string;
//   articleTitle: string;
// }
export interface TableData {
  id: number;
  [key: string]: any; // ویژگی‌های مختلف برای جداول مختلف
}

// interface ProductTableData extends TableData {
//   productName: string;
//   price: number;
//   quantity: number;
//   // ویژگی‌های خاص جدول محصولات
// }
interface PanelContainerProps<T extends TableData> {
  users: T[]; // می‌توانید اینجا نوع داده‌ها را به‌صورت عمومی بگذارید
  INITIAL_VISIBLE_COLUMNS?: string[];
  quantity: string;
  topContents?: boolean;
  bottomContents?: boolean;
  btn?: boolean;
  btnhref?: string;
  dropDownBtn?: boolean;
  roles: boolean;
  product: boolean;
  viewContent?: boolean;
  children: React.ReactNode;
  viewContentSmSize?: boolean;
}

export default function FilteredContainer({
  users,
  INITIAL_VISIBLE_COLUMNS,
  columns,
  quantity,
  topContents,
  bottomContents,
  btn,
  btnhref,
  dropDownBtn,
  roles,
  product,
  viewContent,
  children,
  viewContentSmSize,
}: PanelContainerProps) {
  const { page, setPage } = useTableStore();

  React.useEffect(() => {
    useTableStore.setState({
      visibleColumns: new Set(INITIAL_VISIBLE_COLUMNS),
    });
  }, [INITIAL_VISIBLE_COLUMNS]);
  const userData = users || [];

  const { pages } = useFilteredContainer(userData);
  return (
    <div>
      {topContents && (
        <TopContent
          columns={columns}
          usersLength={userData.length}
          quantity={quantity}
          btn={btn}
          btnhref={btnhref}
          dropDownBtn={dropDownBtn}
          roles={roles}
          product={product}
          viewContent={viewContent}
          viewContentSmSize={viewContentSmSize}
        />
      )}

      {children}

      {bottomContents && (
        <BottomContent page={page} pages={pages} setPage={setPage} />
      )}
    </div>
  );
}
