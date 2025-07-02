"use client";
import React from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import TopContent from "../module/filterdContent/topContent/TopContent";
import BottomContent from "../module/filterdContent/BottomContent";

export interface TableData {
  id: number | string;
  key?: string;
}
interface PanelContainerProps<T extends TableData> {
  datas: T[];
  INITIAL_VISIBLE_COLUMNS?: string[];
  quantity: string;
  topContents?: boolean;
  bottomContents?: boolean;
  addBtn?: boolean;
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
}

export default function FilteredContainer<T extends TableData>({
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
  page,
  setPage,
}: PanelContainerProps<T>) {
  // const { page, setPage } = useTableStore();

  React.useEffect(() => {
    useTableStore.setState({
      visibleColumns: new Set(INITIAL_VISIBLE_COLUMNS),
    });
  }, [INITIAL_VISIBLE_COLUMNS]);
  const userData = datas || [];

  const { pages } = useFilteredContainer(userData, page);
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
