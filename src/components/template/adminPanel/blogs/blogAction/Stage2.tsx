"use client";
import React, { useEffect, useState } from "react";
import BlurModal from "@/components/element/BlurModal";
import TextEditor from "@/components/module/textEditor/TextEditor";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import FileInput from "@/components/element/FileInput";
import { Button } from "@heroui/button";
import Image from "next/image";
import { EditorItem } from "@/types";
import {
  createNewBlogContent,
  createNewBlogImageContent,
} from "@/services/api/blogs";
import { useMutation } from "@tanstack/react-query";
import { useBlogFormStore } from "@/store/useBlogFormStore";
import { imageUrlToFile } from "@/utils/formatter/fileFormatter";

const Stage2 = () => {
  const { formData, setFormData } = useBlogFormStore();
  const items = formData.items || []; // دریافت آیتم‌های موجود
  const html = formData.content || ""; // محتوای متن ویرایش شده
  const [isSaved, setIsSaved] = useState(false); // برای ذخیره‌سازی محتوا
  const [editingItem, setEditingItem] = useState<EditorItem | null>(null);
  const [editingHtml, setEditingHtml] = useState(""); // محتوای ویرایش شده متن
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isModalOpenCreateText, setIsModalOpenCreateText] = useState(false);
  const [isModalOpenEditText, setIsModalOpenEditText] = useState(false);

  console.log(formData, "formData in Stage2");

  useEffect(() => {
    if (coverImageUrl) {
      // convert preve link to file
      async function fetchMyApi() {
        const file = await imageUrlToFile(coverImageUrl);
        setUploadedImageFile("coverImage", file);
      }
      fetchMyApi();
    }
  }, []);
  // Mutation برای متن
  const contentMutation = useMutation({
    mutationFn: (content: {
      content: string;
      blog: string;
      index: number;
      class_name: string;
      is_multiline: boolean;
    }) => createNewBlogContent(content),
  });
  // Mutation برای تصویر
  const imageMutation = useMutation({
    mutationFn: async (formData: FormData & { blog: string }) => {
      // لاگ گرفتن از formData
      console.log("Form Data:", formData);

      // فراخوانی تابع برای ارسال درخواست
      return createNewBlogImageContent(formData);
    },
  });

  const handleSubmit = async () => {
    const imageItem = items.find((item) => item.type === "image");
    const textItems = items.filter((item) => item.type === "text");
    if (!formData.id) return;

    try {
      if (imageItem && uploadedImageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", uploadedImageFile);
        formDataToSend.append("blog", formData.id);

        await imageMutation.mutateAsync(formDataToSend as any); // ارسال به سرور
      }

      // 2. ارسال هر متن جداگانه
      for (const textItem of textItems) {
        await contentMutation.mutateAsync({
          content: textItem.content,
          blog: formData.id,
          index: 0,
          class_name: "skin-type",
          is_multiline: false,
        });
      }

      alert("همه چیز با موفقیت ارسال شد!");
    } catch (error) {
      console.error("خطا در ارسال:", error);
      alert("مشکلی در ارسال وجود داشت.");
    }
  };

  // تابع برای افزودن یک آیتم متنی جدید
  const addTextItem = () => {
    if (!html.trim()) return; // اگر محتوای متن خالی باشد، کاری انجام نده

    const newItem: EditorItem = {
      id: Math.random().toString(36).substr(2, 9), // تولید یک id منحصر به فرد
      type: "text",
      content: html, // محتوای متن
    };

    setFormData({
      items: [...items, newItem], // افزودن آیتم جدید به لیست
      content: "", // پاک کردن محتوای تکست بعد از افزودن
    });
    setIsSaved(false); // بعد از افزودن، حالت ذخیره‌سازی را غیرفعال می‌کنیم
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageUrl(URL.createObjectURL(file));
    }
  };

  // تابع برای حذف یک آیتم
  const handleDeleteItem = (id: string) => {
    setFormData({
      items: items.filter((item) => item.id !== id),
    });
  };

  // تابع برای به‌روزرسانی یک آیتم
  const handleUpdateItem = () => {
    if (!editingItem) return; // اگر آیتمی برای ویرایش وجود ندارد، کاری انجام نده

    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? { ...item, content: editingHtml } : item
    );

    setFormData({ items: updatedItems }); // به‌روزرسانی لیست آیتم‌ها
    setEditingItem(null); // غیرفعال کردن ویرایش
    setIsSaved(false); // بازنشانی حالت ذخیره‌سازی
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

      <div className="shadow-md bg-white rounded-lg p-4 mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          {/* دکمه‌های سمت راست: مودال افزودن متن و افزودن عکس */}
          <div className="flex gap-4">
            <Button
              className="bg-green-500 text-white"
              onPress={() => setIsModalOpenCreateText(true)}
            >
              ساخت متن
            </Button>

            {/* مودال افزودن متن */}
            <BlurModal
              isOpen={isModalOpenCreateText}
              onClose={() => setIsModalOpenCreateText(false)}
              title="ساخت متن"
              bodyContent={
                <TextEditor
                  html={html}
                  setHtml={(newHtml) => setFormData({ content: newHtml })}
                  onSave={() => setIsSaved(true)}
                />
              }
              onConfirm={addTextItem}
              heightProp="full"
              //disabled={!isSaved}
            />

            {/* ورودی فایل برای افزودن عکس */}
            <FileInput
              multiple={false}
              name="blogImage"
              label="افزودن عکس هدر"
              onChange={handleImageUpload} // تابع آپلود تصویر
              disabled={items.some((item) => item.type === "image")}
            />
          </div>

          {/* دکمه سمت چپ: ثبت */}
          <Button
            size="md"
            className="bg-secondary-500 text-white"
            onPress={handleSubmit}
            isLoading={contentMutation.isPending || imageMutation.isPending}
          >
            ثبت
          </Button>
        </div>

        <div className="flex flex-col gap-6 mt-6">
          {/* نمایش تصویر هدر */}
          {coverImageUrl && (
            <div className="relative overflow-hidden rounded-lg h-64 ">
              <Image
                fill
                alt="cover-iamge"
                src={coverImageUrl}
                className="object-cover object-center"
              />
              <Button
                onPress={() =>
                  handleDeleteItem(
                    items.find((item) => item.type === "image")!.id
                  )
                }
                size="sm"
                className="absolute top-2 left-2 bg-white text-red-500"
              >
                حذف
              </Button>
            </div>
          )}

          {/* نمایش متن‌ها */}
          <div className="flex flex-col gap-4">
            {items
              .filter((item) => item.type === "text")
              .map((item) => (
                <div key={item.id} className="relative p-4 ">
                  <div
                    className=" text-gray-800 leading-7 prose max-w-none list-custome br-custome"
                    dangerouslySetInnerHTML={{ __html: item.content }} // نمایش محتویات متن
                  />

                  <div className="flex items-center justify-end gap-2 pt-3">
                    {/* مودال برای ویرایش متن */}
                    <Button
                      className="bg-green-500 text-white"
                      onPress={() => {
                        setIsModalOpenEditText(true);
                        if (item) {
                          setEditingItem(item);
                          setEditingHtml(item.content);
                        }
                      }}
                    >
                      ویرایش متن
                    </Button>
                    <BlurModal
                      title="ویرایش متن"
                      isOpen={isModalOpenEditText}
                      onClose={() => setIsModalOpenEditText(false)}
                      //item={item}
                      //setEditingItem={setEditingItem}
                      //setEditingHtml={setEditingHtml}
                      bodyContent={
                        <TextEditor
                          html={editingHtml} // محتوای ویرایش شده
                          setHtml={(newHtml) => setEditingHtml(newHtml)} // بروزرسانی محتوای ویرایش شده
                          onSave={() => setIsSaved(true)} // ذخیره تغییرات
                        />
                      }
                      onConfirm={handleUpdateItem} // تایید ویرایش
                      heightProp="full"
                      size="sm"
                      disabled={!isSaved}
                    />

                    {/* دکمه حذف */}
                    <Button
                      onPress={() => handleDeleteItem(item.id)}
                      size="sm"
                      className="bg-red-500 text-white"
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage2;
