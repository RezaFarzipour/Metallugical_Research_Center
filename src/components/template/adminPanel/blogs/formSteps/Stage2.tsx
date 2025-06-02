"use client";
import React, { useRef, useState } from "react";
import BlurModal from "@/components/element/BlurModal";
import TextEditor, {
  TextEditorRef,
} from "@/components/module/textEditor/TextEditor";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import { Button } from "@heroui/button";
import { EditorItem } from "@/types";
import {
  createNewBlogContent,
  createNewBlogImageContent,
} from "@/services/api/blogs";
import { useMutation } from "@tanstack/react-query";
import { useBlogFormStore } from "@/store/useBlogFormStore";
import { useRouter } from "next/navigation";
import { BtnLoader } from "@/components/element/Loader";
import { showToast } from "@/store/useToastSlice";

const Stage2 = () => {
  const { formData, setFormData } = useBlogFormStore();
  const items = formData.items || [];
  const [editingItem, setEditingItem] = useState<EditorItem | null>(null);
  const [editingHtml, setEditingHtml] = useState("");
  const [isModalOpenCreateText, setIsModalOpenCreateText] = useState(false);
  const [isModalOpenEditText, setIsModalOpenEditText] = useState(false);

  const router = useRouter();
  const editorRef = useRef<TextEditorRef>(null);
  const editRef = useRef<TextEditorRef>(null);

  const contentMutation = useMutation({
    mutationFn: (content: {
      content: string;
      blog: string;
      index: number;
      class_name: string;
      is_multiline: boolean;
    }) => createNewBlogContent(content),
  });

  const imageMutation = useMutation({
    mutationFn: async (formData: FormData & { blog: string }) => {
      return createNewBlogImageContent(formData);
    },
  });

  const handleSubmit = async () => {
    const textItems = items.filter((item) => item.type === "text");
    if (!formData.id) return;

    try {
      for (const textItem of textItems) {
        await contentMutation.mutateAsync({
          content: textItem.content,
          blog: formData.id,
          index: 0,
          class_name: "skin-type",
          is_multiline: false,
        });
      }
      localStorage.clear();
      router.push("/admin/blogs");
      showToast("بلاگ با موفقیت ایجاد شد", "success");
    } catch (error) {
      showToast("خطایی رخ داده است", "error");
    }
  };

  const addTextItem = () => {
    const content = editorRef.current?.getHtml() || "";
    if (!content.trim()) return;

    const newItem: EditorItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      content,
    };

    setFormData({
      items: [...items, newItem],
    });
    setIsModalOpenCreateText(false);
  };

  const handleDeleteItem = (id: string) => {
    setFormData({
      items: items.filter((item) => item.id !== id),
    });
  };

  const handleUpdateItem = () => {
    const content = editRef.current?.getHtml() || "";
    if (!editingItem) return;

    const updatedItems = items.map((item) =>
      item.id === editingItem.id ? { ...item, content } : item
    );

    setFormData({ items: updatedItems });
    setEditingItem(null);
    setIsModalOpenEditText(false);
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
          <div className="flex gap-4">
            <Button
              className="text-white bg-gradient-to-r from-green-500 to-green-700"
              onPress={() => setIsModalOpenCreateText(true)}
            >
              ساخت محتوا
            </Button>

            <BlurModal
              isOpen={isModalOpenCreateText}
              onClose={() => setIsModalOpenCreateText(false)}
              title="ساخت محتوا"
              bodyContent={<TextEditor ref={editorRef} html="" />}
              onConfirm={addTextItem}
              heightProp="full"
            />
          </div>

          <Button
            size="md"
            className="text-white bg-gradient-to-r from-secondary-500 to-secondary-700"
            onPress={handleSubmit}
          >
            {contentMutation.isPending || imageMutation.isPending ? (
              <BtnLoader />
            ) : (
              "ثبت"
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-6 mt-6">
          {items
            .filter((item) => item.type === "text")
            .map((item) => (
              <div key={item.id} className="relative p-4">
                <div
                  className="text-gray-800 leading-7 prose max-w-none list-custome br-custome"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <div className="flex items-center justify-end gap-2 pt-3">
                  <Button
                    className="text-white bg-gradient-to-r from-green-500 to-green-700"
                    onPress={() => {
                      setIsModalOpenEditText(true);
                      setEditingItem(item);
                      setEditingHtml(item.content);
                    }}
                    size="sm"
                  >
                    ویرایش متن
                  </Button>

                  <BlurModal
                    title="ویرایش متن"
                    isOpen={isModalOpenEditText}
                    onClose={() => setIsModalOpenEditText(false)}
                    bodyContent={
                      <TextEditor ref={editRef} html={editingHtml} />
                    }
                    onConfirm={handleUpdateItem}
                    heightProp="full"
                  />

                  <Button
                    onPress={() => handleDeleteItem(item.id)}
                    size="sm"
                    className="text-white bg-gradient-to-r from-red-500 to-red-700"
                  >
                    حذف
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Stage2;
