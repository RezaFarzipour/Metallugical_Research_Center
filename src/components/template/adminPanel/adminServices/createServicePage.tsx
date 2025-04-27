import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import ServicesAction from "@/components/module/panelAction/ServicesAction";
import React from "react";

const createServicePage = () => {
  return (
    <div>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="ساخت سرویس"
          panelHref="/admin/services"
        />
      </div>
      <ServicesAction />
    </div>
  );
};

export default createServicePage;
