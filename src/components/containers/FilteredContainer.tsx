"use client";

import React from "react";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import BottomContent from "../element/filterdContent/BottomContent";
import TopContent from "../element/filterdContent/topContent/TopContent";

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

interface PanelContainerProps {
  users: User[];
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

  const { pages } = useFilteredContainer(users);

  return (
    <div>
      {topContents && (
        <TopContent
          usersLength={users.length}
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
