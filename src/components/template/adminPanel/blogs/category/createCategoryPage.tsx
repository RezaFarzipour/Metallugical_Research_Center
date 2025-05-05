"use client";

import RHFInput from "@/components/element/RHFInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateService } from "../useCreate";
import { useEditService } from "../useEditService";
import { showToast } from "@/store/useToastSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBlogCategoryById } from "@/services/api/blogs";
import { useEffect } from "react";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import BtnLoader from "@/components/element/BtnLoader";

const categorySchema = z.object({
  category_name: z.string().min(1, "نام دسته‌بندی باید پر شود"),
  slug: z.string().min(1, "اسلاگ باید پر شود"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CreateCategory() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = Boolean(editId);

  const router = useRouter();

  const {
    data: categoryData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["single-category", editId],
    queryFn: () => getBlogCategoryById(editId!),
    enabled: isEditMode,
  });

  const form = useForm<CategoryFormData>({
    mode: "onTouched",
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
      slug: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // وقتی دیتا آماده شد و در حالت ویرایش هستیم، فرم رو reset کن
  useEffect(() => {
    if (isEditMode && isSuccess && categoryData) {
      reset({
        category_name: categoryData.category_name,
        slug: categoryData.slug,
      });
    }
  }, [isEditMode, isSuccess, categoryData, reset]);

  const { createCategory } = useCreateService();
  const { editBlogCategory } = useEditService();

  const onSubmit = (formData: CategoryFormData) => {
    if (isEditMode && editId) {
      editBlogCategory(
        { id: editId, form: formData },
        {
          onSuccess: () => {
            showToast("دسته‌بندی با موفقیت ویرایش شد", "success");
            router.push("/admin/blogs/category");
          },
          onError: () => {
            showToast("خطا در ویرایش دسته‌بندی", "error");
          },
        }
      );
    } else {
      createCategory(formData, {
        onSuccess: () => {
          showToast("دسته‌بندی جدید با موفقیت اضافه شد", "success");
          router.push("/admin/blogs/category");
        },
        onError: () => {
          showToast("خطا در ذخیره دسته‌بندی", "error");
        },
      });
    }
  };

  if (isEditMode && isLoading) {
    return <BtnLoader color="#377cfb" />;
  }

  return (
    <>
      <div className="mb-6">
        <BreadcrumbsElement
          item1="دست بندی ها"
          item2="ساخت دست بندی"
          panelHref="/admin/blogs/category"
        />
      </div>
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          {isEditMode ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <RHFInput
            register={register}
            errors={errors}
            label="نام دسته‌بندی"
            type="text"
            dir="rtl"
            name="category_name"
          />
          <RHFInput
            register={register}
            errors={errors}
            label="اسلاگ"
            type="text"
            dir="rtl"
            name="slug"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isEditMode ? "ذخیره تغییرات" : "افزودن"}
          </button>
        </form>
      </div>
    </>
  );
}
