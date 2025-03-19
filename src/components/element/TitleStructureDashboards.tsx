import Link from "next/link";
import React from "react";

type Props = {
  mainTitle: string;
  viewMore?: string;
  icon?: React.ReactNode;
  href?: string;
};

function TitleStructureDashboards({ mainTitle, viewMore, icon, href }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-default-600 mb-8">
      <div className="text-lg sm:text-2xl font-extrabold tracking-tight">
        {mainTitle}
      </div>
      {href && viewMore && (
        <Link
          href={href}
          className="flex items-center gap-x-2 text-sm sm:text-base hover:text-secondary-500 cursor-pointer transition-all duration-300 tracking-tight"
        >
          {viewMore}
          {icon && <span>{icon}</span>}
        </Link>
      )}
    </div>
  );
}

export default TitleStructureDashboards;
