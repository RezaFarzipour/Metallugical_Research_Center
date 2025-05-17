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
  columnsDropDownBtn?: boolean;
  rolesDropDown: boolean;
  stausDropDown: boolean;
  paymentStautsDropDown?: boolean;
  viewContent?: boolean;
  children: React.ReactNode;
  viewContentSmSize?: boolean;
  btnClickHandler?: () => void;
}

export default function FilteredContainer({
  datas,
  INITIAL_VISIBLE_COLUMNS,
  columns,
  quantity,
  topContents,
  bottomContents,
  addBtn,
  columnsDropDownBtn,
  rolesDropDown,
  stausDropDown,
  paymentStautsDropDown,
  viewContent,
  children,
  btnClickHandler,
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
          btnClickHandler={btnClickHandler}
          columnsDropDownBtn={columnsDropDownBtn}
          rolesDropDown={rolesDropDown}
          stausDropDown={stausDropDown}
          paymentStautsDropDown={paymentStautsDropDown}
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
