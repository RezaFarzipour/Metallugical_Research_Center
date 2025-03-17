import React from "react";
import { CgArrowLeft } from "react-icons/cg";

type Props = {
  mainTitle: string;
  viewMore?: string;
  icon?: React.ReactNode;
};

function TitleStructureDashboards({ mainTitle, viewMore, icon }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-default-600 mb-8">
      <div className="text-lg sm:text-2xl font-extrabold tracking-tight">
        {mainTitle}
      </div>
      <div className="flex items-center gap-x-2 text-sm sm:text-base hover:text-secondary-500 cursor-pointer transition-all duration-300 tracking-tight">
        {viewMore}
        <span>{icon}</span>
      </div>
    </div>
  );
}

export default TitleStructureDashboards;
