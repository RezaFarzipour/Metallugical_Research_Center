import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import TableModule from "@/components/module/TableModule";
import React from "react";

type Props = {};

const ReportsPage = (props: Props) => {
  return (
    <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
      <TitleStructureDashboards mainTitle="آخرین سفارش های من" />
      <TableModule />
    </div>
  );
};

export default ReportsPage;
