import RHFInput from "@/components/element/RHFInput";
import { BlogStageOneFormData } from "@/schemas/blogStageOneSchema";
import React from "react";
import {  FieldErrors, Control } from "react-hook-form";

interface ServiceDetailsFormProps {
  control: Control<BlogStageOneFormData>;
  errors: FieldErrors<BlogStageOneFormData>;
}

const BlogDetailsForm: React.FC<ServiceDetailsFormProps> = ({
  control,
  errors,
}) => {
  return (
    <div>
      <RHFInput<BlogStageOneFormData>
        control={control}
        errors={errors}
        label="نام بلاگ"
        type="text"
        dir="rtl"
        name="title"
      />

      <RHFInput<BlogStageOneFormData>
        control={control}
        errors={errors}
        label="تگ ها"
        type="text"
        dir="rtl"
        name="tags"
      />

      <RHFInput<BlogStageOneFormData>
        control={control}
        errors={errors}
        label="اسلاک"
        type="text"
        dir="rtl"
        name="slug"
      />
      <RHFInput<BlogStageOneFormData>
        control={control}
        errors={errors}
        label="اسلاک"
        type="text"
        dir="rtl"
        name="slug"
      />
    </div>
  );
};

export default BlogDetailsForm;
