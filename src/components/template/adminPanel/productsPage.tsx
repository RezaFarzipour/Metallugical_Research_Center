"use client";

import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import PanelContainer from "@/components/module/panel/shared/PanelContainer";
import {
  columns,
  products,
  productsINITIAL_VISIBLE_COLUMNS,
} from "@/constants/tableData";
import { DashboardMinicardProps } from "@/types";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";

interface ProductsPageProps {
  cards: DashboardMinicardProps[];
}
const ProductsPage: React.FC<ProductsPageProps> = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="محصولات" />
        <PanelContainer
          users={products}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={productsINITIAL_VISIBLE_COLUMNS}
          quantity="محصولات"
          firstActionContent="جزئیات"
          firstActionIcon={TbEyeDiscount}
          secondActionContent="حذف"
          secondActionIcon={MdDeleteOutline}
          viewContent={true}
          topContents={true}
          bottomContents={true}
          btn={true}
          dropDownBtn={true}
          roles={false}
          product={true}
          image={true}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
