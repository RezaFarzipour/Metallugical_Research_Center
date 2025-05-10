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
import { useState, useEffect } from "react";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { useBlogFormStore } from "@/store/useBlogFormStore";
import { useCreateBlog } from "../useCreate";
import { showToast } from "@/store/useToastSlice";
import BtnLoader from "@/components/element/BtnLoader";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoryAdmin } from "@/services/api/blogs";
import RHFTagInput from "@/components/element/RHFTagInput";

export default function Stage1() {
  const { setFormData, setStep } = useBlogFormStore();
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const { data = [], isPending } = useQuery({
    queryKey: ["getAll-blogsCategory"],
    queryFn: getAllCategoryAdmin,
  });

  // تبدیل داده‌ها به گزینه‌های قابل استفاده در RHFSelect
  const categoryOptions = data.map((category: any) => ({
    value: category.id,
    label: category.category_name,
  }));

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BlogStageOneFormData>({
    resolver: zodResolver(blogStageOneSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      cover_image: null,
      category_list: [],
      tags: [],
      slug: "",
    },
  });

  const { isPendingBlog, createBlog } = useCreateBlog();

  // مدیریت URL.createObjectURL
  useEffect(() => {
    return () => {
      if (coverImageUrl) {
        URL.revokeObjectURL(coverImageUrl);
      }
    };
  }, [coverImageUrl]);

  const onSubmit = (data: BlogStageOneFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("category_list", JSON.stringify(data.category_list));
    formData.append("tags", JSON.stringify(data.tags));
    if (data.cover_image instanceof File) {
      formData.append("cover_image", data.cover_image);
    }

    createBlog(formData, {
      onSuccess: () => {
        showToast("بلاگ با موفقیت ساخته شد", "success");
        const dataToSave = {
          ...data,
          cover_image: coverImageUrl,
        };
        setFormData(dataToSave);
        setStep(2);
      },
      onError: () => {
        showToast("ساخت بلاگ با خطا مواجه شد", "error");
      },
    });
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
      <div className="flex items-center justify-center text-default-700">
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

          <RHFSelect
            label="دسته بندی‌ها"
            name="category_list"
            control={control}
            options={categoryOptions}
          />

          <Controller
            name="tags"
            control={control}
            rules={{
              required: "تگ‌ها الزامی هستند",
            }}
            render={({ field }) => (
              <RHFTagInput field={field} error={errors.tags} label="تگ ها" />
            )}
          />

          <RHFInput<BlogStageOneFormData>
            register={register}
            errors={errors}
            label="اسلاگ"
            type="text"
            dir="rtl"
            name="slug"
          />

          <Controller
            name="cover_image"
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

          <Button type="submit" disabled={isPendingBlog}>
            {isPendingBlog ? <BtnLoader color="#377cfb" /> : "تایید"}
          </Button>
        </form>
      </div>
    </div>
  );
}
