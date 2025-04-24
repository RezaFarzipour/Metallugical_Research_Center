"use client";

import React from "react";
import { useForm } from "react-hook-form";
import BreadcrumbsElement from "../../../element/Breadcrumbs";
import RHFInput from "../../../element/RHFInput";
import { PersonalRegisterFormData } from "@/schemas/personalRegisterSchema";
import Button from "../../../element/Button";
import FileInput from "../../../element/FileInput";
import { CreateProductFormData } from "@/schemas/createProductSchema";

type Props = {};

const CreateProductPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalRegisterFormData>({
    defaultValues: {
      service_name: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = (data: PersonalRegisterFormData) => {
    console.log("Form Data:", data);
    // شما می‌تونید اینجا axios یا fetch استفاده کنید برای ارسال دیتا
  };

  return (
    <div className="text-default-700 p-8 flex flex-col md:flex-row gap-10 ">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="محصولات"
          item2="ساخت محصول"
          panelHref="/admin/products"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-xl w-full md:w-[50%] space-y-5 bg-white shadow-md mt-10"
      >
        <RHFInput<CreateProductFormData>
          register={register}
          errors={errors}
          label="نام محصول"
          type="text"
          dir="rtl"
          name="service_name"
        />

        <RHFInput<CreateProductFormData>
          register={register}
          errors={errors}
          label="توضیحات"
          type="text"
          dir="rtl"
          name="description"
        />

        <RHFInput<CreateProductFormData>
          register={register}
          errors={errors}
          label="قیمت"
          type="text"
          dir="rtl"
          name="price"
        />

        <FileInput label="انتخال کاور محصول" dir="rtl" />

        <Button type="submit">ثبت</Button>
      </form>
    </div>
  );
};

export default CreateProductPage;
