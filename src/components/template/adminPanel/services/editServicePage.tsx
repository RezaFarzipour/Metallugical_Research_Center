"use client";
import React from "react";
import ServicesAction from "@/components/module/panelAction/ServicesAction";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { serviceDataEditType } from "@/types";

interface EditServicePageProps {
  serviceDataEdit: serviceDataEditType;
}

const EditServicePage: React.FC<EditServicePageProps> = ({
  serviceDataEdit,
}) => {
  return (
    <div>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="ویرایش سرویس"
          panelHref="/admin/services"
        />
      </div>
      <ServicesAction serviceDataEdit={serviceDataEdit} />
    </div>
  );
};

export default EditServicePage;
