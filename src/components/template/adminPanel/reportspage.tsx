"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import PanelContainer from "@/components/module/panel/shared/PanelContainer";
import {
  columns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";

import { DashboardMinicardProps } from "@/types";
import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

interface ReportspageProps {
  cards: DashboardMinicardProps[];
}
const Reportspage: React.FC<ReportspageProps> = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="گزارش ها" />
        <PanelContainer
          users={usersOrders}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          quantity="گزارش ها"
          firstActionContent="تایید"
          firstActionIcon={AiOutlineCheck}
          secondActionContent="لغو"
          secondActionIcon={AiOutlineClose}
          viewContent={false}
          topContents={true}
          bottomContents={true}
          btn={false}
          dropDownBtn={true}
          roles={false}
          product={false}
          image={false}
        />
      </div>
    </div>
  );
};

export default Reportspage;
