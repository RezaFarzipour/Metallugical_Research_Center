"use client"; // برای استفاده از React Hook‌ها در Next.js App Router

import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";

type BlogFormData = {
  title: string;
  cover_image: File | null;
  category_list: string[];
  tags: string;
  slug: string;
};

type ContentFormData = {
  content: string;
  class_name: string;
  is_multiline: boolean;
};

type ImageFormData = {
  image: File | null;
};

const BlogsForm = () => {
  // استیت برای فرم بلاگ اصلی
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({
    title: "",
    cover_image: null,
    category_list: [],
    tags: "",
    slug: "",
  });

  // استیت برای فرم محتوا
  const [contentFormData, setContentFormData] = useState<ContentFormData>({
    content: "",
    class_name: "",
    is_multiline: false,
  });

  // استیت برای فرم تصویر
  const [imageFormData, setImageFormData] = useState<ImageFormData>({
    image: null,
  });

  // تغییرات فرم بلاگ اصلی
  const handleBlogChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "cover_image") {
      const file = (e.target as HTMLInputElement).files?.[0];
      setBlogFormData((prev) => ({ ...prev, [name]: file || null }));
    } else {
      setBlogFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // تغییرات فرم محتوا
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "is_multiline") {
      setContentFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setContentFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // تغییرات فرم تصویر
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files?.[0]);
    setImageFormData({ image: file || null });
  };

  // ارسال داده‌های همه فرم‌ها
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // جمع‌آوری داده‌های همه فرم‌ها
    const allFormData = {
      blog: blogFormData,
      content: contentFormData,
      image: imageFormData,
    };

    console.log("داده‌های کلی فرم:", allFormData);

    // ارسال داده‌ها به API
    // مثلاً:
    // fetch("/api/submit", { method: "POST", body: JSON.stringify(allFormData) });
  };

  const categories = [
    { key: "technology", label: "فناوری" },
    { key: "design", label: "طراحی" },
    { key: "business", label: "کسب‌وکار" },
    { key: "health", label: "سلامت" },
    { key: "education", label: "آموزش" },
  ];

  return (
    <div
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      dir="rtl"
    >
      {/* هدر مشترک */}
      <h2 className="text-3xl font-bold mb-6 text-center">فرم ایجاد بلاگ</h2>

      {/* فرم کلی */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* بخش بلاگ اصلی */}
        <div>
          <h3 className="text-xl font-semibold mb-4">اطلاعات بلاگ</h3>
          {/* عنوان */}
          <Input
            label="عنوان"
            type="text"
            id="title"
            name="title"
            value={blogFormData.title}
            onChange={handleBlogChange}
            placeholder="عنوان بلاگ را وارد کنید"
            required
          />

          {/* آپلود تصویر پشتیبان */}
          <div>
            <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700">
              تصویر پشتیبان
            </label>
            <input
              type="file"
              id="cover_image"
              name="cover_image"
              onChange={handleBlogChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
          </div>

          {/* دسته‌بندی‌ها */}
          <Select
            isRequired
            label="دسته‌بندی‌ها"
            selectionMode="multiple"
            placeholder="دسته‌بندی‌ها را انتخاب کنید"
            selectedKeys={new Set(blogFormData.category_list)}
            onSelectionChange={(keys) =>
              setBlogFormData((prev) => ({
                ...prev,
                category_list: Array.from(keys),
              }))
            }
            className="max-w-xs"
          >
            {categories.map((category) => (
              <SelectItem key={category.key}>{category.label}</SelectItem>
            ))}
          </Select>

          {/* تگ‌ها */}
          <Input
            label="تگ‌ها (با کاما جدا شوند)"
            type="text"
            id="tags"
            name="tags"
            value={blogFormData.tags}
            onChange={handleBlogChange}
            placeholder="مثال: nextjs, tailwind, react"
            required
          />

          {/* اسلاگ */}
          <Input
            label="اسلاگ"
            type="text"
            id="slug"
            name="slug"
            value={blogFormData.slug}
            onChange={handleBlogChange}
            placeholder="مثال: بلاگ-جدید-من"
            required
          />
        </div>

        {/* بخش محتوا */}
        <div>
          <h3 className="text-xl font-semibold mb-4">افزودن محتوا</h3>
          {/* متن محتوا */}
          <Input
            label="محتوا"
            type="text"
            id="content"
            name="content"
            value={contentFormData.content}
            onChange={handleContentChange}
            placeholder="متن محتوا را وارد کنید"
            required
          />

          {/* نام کلاس */}
          <Input
            label="نام کلاس"
            type="text"
            id="class_name"
            name="class_name"
            value={contentFormData.class_name}
            onChange={handleContentChange}
            placeholder="نام کلاس را وارد کنید"
            required
          />

          {/* چندخطی */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_multiline"
              name="is_multiline"
              checked={contentFormData.is_multiline}
              onChange={handleContentChange}
              className="mr-2"
            />
            <label htmlFor="is_multiline" className="text-sm font-medium text-gray-700">
              چندخطی
            </label>
          </div>
        </div>

        {/* بخش تصویر */}
        <div>
          <h3 className="text-xl font-semibold mb-4">آپلود تصویر</h3>
          {/* آپلود تصویر */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              تصویر
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              required
            />
          </div>
        </div>

        {/* دکمه ارسال مشترک */}
        <div className="flex justify-end">
          <Button type="submit" color="primary" className="font-medium py-2 px-4">
            ارسال
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogsForm;