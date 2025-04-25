"use client";
import React from "react";
import ServicesAction from "@/components/module/panelAction/ServicesAction";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";

type Props = {};

const EditServicePage = ({ ServiceDataEdit }) => {
  console.log("editData", ServiceDataEdit);

  return (
    <div>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="ویرایش سرویس"
          panelHref="/admin/services"
        />
      </div>
      <ServicesAction ServiceDataEdit={ServiceDataEdit} />
    </div>
  );
};

export default EditServicePage;
