"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import RHFInput from "@/components/element/RHFInput";
import RHFSelect from "@/components/element/RHFSelect";
import {
  BlogStageOneFormData,
  blogStageOneSchema,
} from "@/schemas/blogStageOneSchema";
import Image from "next/image";
import { IoTrashBinOutline } from "react-icons/io5";
import FileInput from "@/components/element/FileInput";
import { useState } from "react";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";

const categories = [
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Science", label: "Science" },
  { value: "Business", label: "Business" },
  { value: "Travel", label: "Travel" },
  { value: "Education", label: "Education" },
];

export default function Stage1() {
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BlogStageOneFormData>({
    resolver: zodResolver(blogStageOneSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      coverImage: "",
      categoryList: [],
      tags: [],
      slug: "",
    },
  });

  const onSubmit = (data: BlogStageOneFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="بلاگ ها"
          item2="ساخت بلاگ"
          panelHref="/admin/blogs"
        />
      </div>
      <div className=" flex items-center justify-center  text-default-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8 bg-white p-4 rounded-xl w-full max-w-lg"
        >
          <RHFInput<BlogStageOneFormData>
            register={register}
            errors={errors}
            label="عنوان پست"
            type="text"
            dir="rtl"
            name="title"
          />

          {/* دسته بندی ها */}
          <RHFSelect
            label="دسته بندی‌ها"
            name="categoryList"
            control={control}
            options={categories}
            required
          />

          <RHFInput<BlogStageOneFormData>
            register={register}
            errors={errors}
            label="تگ ها "
            type="text"
            dir="rtl"
            name="tags"
          />

          <RHFInput<BlogStageOneFormData>
            register={register}
            errors={errors}
            label="اسلاگ "
            type="text"
            dir="rtl"
            name="slug"
          />

          <Controller
            name="coverImage"
            control={control}
            render={({ field: { value, onChange, ...rest } }) => (
              <FileInput
                multiple={false}
                label="انتخاب کاور بلاگ"
                errors={errors}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onChange(file);
                    setCoverImageUrl(URL.createObjectURL(file));
                  }
                }}
                {...rest}
              />
            )}
          />

          {coverImageUrl && (
            <div className="relative aspect-[2/1] overflow-hidden rounded-md">
              <Image
                fill
                alt="cover-image"
                src={coverImageUrl}
                className="object-cover object-center"
              />
              <Button
                type="button"
                onClick={() => {
                  setCoverImageUrl(null);
                  setValue("cover_image", null);
                }}
                isIconOnly
                className="w-8 h-8 absolute left-1 top-2 bg-red-100"
              >
                <IoTrashBinOutline size={20} color="red" />
              </Button>
            </div>
          )}

          <Button type="submit">مرحله بعد</Button>
        </form>
      </div>
    </div>
  );
}
