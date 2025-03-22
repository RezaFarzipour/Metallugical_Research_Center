"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import PanelContainer from "@/components/module/panel/shared/PanelContainer";
import {
  columns,
  users,
  usersINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import { DashboardMinicardProps } from "@/types";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";

interface UsersPageProps {
  cards: DashboardMinicardProps[];
}
const UsersPage: React.FC<UsersPageProps> = () => {
  return (
    <div className="grid grid-cols-1" >
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="کاربران" />
        <PanelContainer
          users={users}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={usersINITIAL_VISIBLE_COLUMNS}
          quantity="کاربران"
          firstActionContent="جزئیات"
          firstActionIcon={TbEyeDiscount}
          secondActionContent="حذف"
          secondActionIcon={MdDeleteOutline}
          viewContent={false}
          topContents={true}
          bottomContents={true}
          btn={true}
          dropDownBtn={true}
          roles={true}
          product={false}
          image={false}
        />
      </div>
    </div>
  );
};

export default UsersPage;
