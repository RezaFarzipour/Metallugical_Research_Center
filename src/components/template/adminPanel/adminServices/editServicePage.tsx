"use client";
import React, { useMemo, useState } from "react";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { serviceDataEditType } from "@/types";
import FirstStepAction from "./serviceAction/FirstStepAction";
import SecondStepAction from "./serviceAction/SecondStepAction";

interface ServiceImageType {
  id: string | number;
  image: string;
}
interface EditServicePageProps {
  serviceDataEdit: serviceDataEditType;
  filteredServiceImages: ServiceImageType[];
}

const EditServicePage: React.FC<EditServicePageProps> = ({
  serviceDataEdit,
  filteredServiceImages,
}) => {
  const [step, setStep] = useState(1);

  const memoizedFilteredServiceImages = useMemo(
    () => filteredServiceImages,
    [filteredServiceImages]
  );
  return (
    <div>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="ویرایش سرویس"
          panelHref="/admin/services"
        />
      </div>

      {step === 1 && (
        <FirstStepAction serviceDataEdit={serviceDataEdit} setStep={setStep} />
      )}

      {step === 2 && (
        <SecondStepAction
          filteredServiceImages={memoizedFilteredServiceImages}
        />
      )}
    </div>
  );
};

export default EditServicePage;
