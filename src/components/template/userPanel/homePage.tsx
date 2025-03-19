"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import MiniCardModule from "@/components/module/panel/shared/MiniCardModule";
import PanelContainer from "@/components/module/panel/shared/PanelContainer";
import { userCards } from "@/constants/data";
import {
  columns,
  usersOrders,
  usersOrdersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import { DashboardMinicardProps } from "@/types";
import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CgArrowLeft } from "react-icons/cg";

interface HomePageProps {
  cards: DashboardMinicardProps[];
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <MiniCardModule cards={userCards} />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="آخرین سفارش های من"
          viewMore="مشاهده همه سفارش ها"
          href="/user/reports"
          icon={<CgArrowLeft />}
        />
        <PanelContainer
          users={usersOrders}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={usersOrdersINITIAL_VISIBLE_COLUMNS}
          firstActionContent="پرداخت"
          secondActionContent="لغو"
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
