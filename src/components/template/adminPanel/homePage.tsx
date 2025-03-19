"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/panel/shared/MiniCardModule";
import { DashboardMinicardProps } from "@/types";
import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CgArrowLeft } from "react-icons/cg";
import {
  columns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import { adminCards } from "@/constants/data";
import PanelContainer from "@/components/module/panel/shared/PanelContainer";

interface HomePageProps {
  cards: DashboardMinicardProps[];
}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="داشبورد" />
        <MiniCardModule cards={adminCards} />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="گزارش های اخیر"
          viewMore="مشاهده همه "
          href="/admin/reports"
          icon={<CgArrowLeft />}
        />
        <PanelContainer
          users={usersOrders}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          firstActionContent="تایید"
          firstActionIcon={AiOutlineCheck}
          secondActionContent="لغو"
          secondActionIcon={AiOutlineClose}
          viewContent={false}
          topContents={false}
          bottomContents={false}
          btn={false}
          dropDownBtn={false}
          roles={false}
          product={false}
          image={false}
        />
      </div>
    </div>
  );
};

export default HomePage;
