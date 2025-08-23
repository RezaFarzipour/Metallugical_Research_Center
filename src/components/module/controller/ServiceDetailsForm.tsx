import RHFInput from "@/components/element/RHFInput";
import { CreateServiceFormData } from "@/schemas/createServiceSchema";
import React from "react";
import {  FieldErrors, Control } from "react-hook-form";

interface ServiceDetailsFormProps {
  control: Control<CreateServiceFormData>;
  errors: FieldErrors<CreateServiceFormData>;
  servicename:string
}

const ServiceDetailsForm: React.FC<ServiceDetailsFormProps> = ({
  control,
  errors,
  servicename
}) => {
  return (
    <div>
      <RHFInput<CreateServiceFormData>
        control={control}
        errors={errors}
        label={servicename}
        type="text"
        dir="rtl"
        name="service_name"
      />

      <RHFInput<CreateServiceFormData>
        control={control}
        errors={errors}
        label="توضیحات"
        type="text"
        dir="rtl"
        name="description"
      />

      <RHFInput<CreateServiceFormData>
        control={control}
        errors={errors}
        label="قیمت"
        type="text"
        dir="rtl"
        name="price"
      />
    </div>
  );
};

export default ServiceDetailsForm;
