"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import PanelContainer from "@/components/module/panel/shared/PanelContainer";
import {
  blogColumns,
  blogs,
  blogsINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";

import { DashboardMinicardProps } from "@/types";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";

interface BlogsPageProps {
  cards: DashboardMinicardProps[];
}
const BlogsPage: React.FC<BlogsPageProps> = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="بلاگ ها" />
        <PanelContainer
          users={blogs}
          columns={blogColumns}
          INITIAL_VISIBLE_COLUMNS={blogsINITIAL_VISIBLE_COLUMNS}
          quantity="بلاگ ها"
          firstActionContent="جزئیات"
          firstActionIcon={TbEyeDiscount}
          secondActionContent="حذف"
          secondActionIcon={MdDeleteOutline}
          viewContent={true}
          topContents={true}
          bottomContents={true}
          btn={true}
          dropDownBtn={false}
          roles={true}
          product={false}
          image={true}
        />
      </div>
    </div>
  );
};

export default BlogsPage;
