import RHFInput from "@/components/element/RHFInput";
import { CreateServiceFormData } from "@/schemas/createServiceSchema";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ServiceDetailsFormProps {
  register: UseFormRegister<CreateServiceFormData>;
  errors: FieldErrors<CreateServiceFormData>;
}

const ServiceDetailsForm: React.FC<ServiceDetailsFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div>
      <RHFInput<CreateServiceFormData>
        register={register}
        errors={errors}
        label="نام محصول"
        type="text"
        dir="rtl"
        name="service_name"
      />

      <RHFInput<CreateServiceFormData>
        register={register}
        errors={errors}
        label="توضیحات"
        type="text"
        dir="rtl"
        name="description"
      />

      <RHFInput<CreateServiceFormData>
        register={register}
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
