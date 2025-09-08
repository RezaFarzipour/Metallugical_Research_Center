"use client";
import React from "react";
import { useTableStore } from "@/store/useTableSlice";
import TopContent from "../module/filterdContent/topContent/TopContent";
import BottomContent from "../module/filterdContent/BottomContent";

export interface TableData {
  id: number | string;
  key?: string;
}
interface PanelContainerProps<T extends TableData> {
  datas: T[];
  tableStore: typeof useTableStore;
  quantity: string;
  topContents?: boolean;
  bottomContents?: boolean;
  addBtn?: boolean;
  addBtnContent?: string;
  columnsDropDownBtn?: boolean;
  rolesDropDown: boolean;
  stausDropDown: boolean;
  columns?: {
    name: string;
    uid: string;
  }[];
  paymentStautsDropDown?: boolean;
  viewContent?: boolean;
  children: React.ReactNode;
  viewContentSmSize?: boolean;
  btnClickHandler?: () => void;
  page: number;
  setPage: (page: number) => void;
  pages?: number;
}

export default function FilteredContainer<T extends TableData>({
  datas,
  tableStore,
  columns,
  quantity,
  topContents,
  bottomContents,
  addBtn,
  addBtnContent,
  columnsDropDownBtn,
  rolesDropDown,
  stausDropDown,
  paymentStautsDropDown,
  viewContent,
  children,
  btnClickHandler,
  viewContentSmSize,
  page,
  setPage,
  pages,
}: PanelContainerProps<T>) {
  const userData = datas || [];

  return (
    <div>
      {topContents && (
        <TopContent
          columns={columns}
          tableStore={tableStore}
          usersLength={userData.length}
          quantity={quantity}
          addBtn={addBtn}
          addBtnContent={addBtnContent}
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
