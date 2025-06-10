import RHFInput from "@/components/element/RHFInput";
import { BlogStageOneFormData } from "@/schemas/blogStageOneSchema";
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface ServiceDetailsFormProps {
  register: UseFormRegister<BlogStageOneFormData>;
  errors: FieldErrors<BlogStageOneFormData>;
}

const BlogDetailsForm: React.FC<ServiceDetailsFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div>
      <RHFInput<BlogStageOneFormData>
        register={register}
        errors={errors}
        label="نام بلاگ"
        type="text"
        dir="rtl"
        name="title"
      />

      <RHFInput<BlogStageOneFormData>
        register={register}
        errors={errors}
        label="تگ ها"
        type="text"
        dir="rtl"
        name="tags"
      />

      <RHFInput<BlogStageOneFormData>
        register={register}
        errors={errors}
        label="اسلاک"
        type="text"
        dir="rtl"
        name="slug"
      />
      <RHFInput<BlogStageOneFormData>
        register={register}
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
