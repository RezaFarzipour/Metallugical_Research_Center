"use client";

import React from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import TopContent from "../module/filterdContent/topContent/TopContent";
import BottomContent from "../module/filterdContent/BottomContent";

export interface TableData {
  id: number;
  [key: string]: any; // ویژگی‌های مختلف برای جداول مختلف
}
interface PanelContainerProps<T extends TableData> {
  datas: T[]; // می‌توانید اینجا نوع داده‌ها را به‌صورت عمومی بگذارید
  INITIAL_VISIBLE_COLUMNS?: string[];
  quantity: string;
  topContents?: boolean;
  bottomContents?: boolean;
  addBtn?: boolean;
  addBtnhref?: string;
  columnsDropDownBtn?: boolean;
  rolesDropDown: boolean;
  stausDropDown: boolean;
  viewContent?: boolean;
  children: React.ReactNode;
  viewContentSmSize?: boolean;
}

export default function FilteredContainer({
  datas,
  INITIAL_VISIBLE_COLUMNS,
  columns,
  quantity,
  topContents,
  bottomContents,
  addBtn,
  addBtnhref,
  columnsDropDownBtn,
  rolesDropDown,
  stausDropDown,
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
  const userData = datas || [];

  const { pages } = useFilteredContainer(userData);
  return (
    <div>
      {topContents && (
        <TopContent
          columns={columns}
          usersLength={userData.length}
          quantity={quantity}
          addBtn={addBtn}
          addBtnhref={addBtnhref}
          columnsDropDownBtn={columnsDropDownBtn}
          rolesDropDown={rolesDropDown}
          stausDropDown={stausDropDown}
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
