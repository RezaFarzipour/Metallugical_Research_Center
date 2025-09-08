"use client";
import React, { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import { Button } from "@heroui/button";
import Empty from "@/components/element/Empty";
import Link from "next/link";
import Table from "@/components/element/Table";
import ModalModule from "@/components/element/ModalModule";
import { getAllCategoryAdmin } from "@/services/api/blogs";
import { useDeleteBlogCategory } from "../hooks/useDeleteCategory";
import { showToast } from "@/store/useToastSlice";
import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import { FaPlus } from "react-icons/fa";
import { BtnLoader } from "@/components/element/Loader";
import { blogDatafromServer } from "@/types";

const CategoryBlog = () => {
  const queryClient = useQueryClient();
  const { data = [], isPending } = useQuery({
    queryKey: ["getAll-blogsCategory"],
    queryFn: getAllCategoryAdmin,
  });

  const { deletBlogCategory } = useDeleteBlogCategory();

  // وضعیت مودال
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(
    null
  );

  // باز کردن مودال و ذخیره شناسه دسته‌بندی
  const openModal = (id: string) => {
    setCategoryIdToDelete(id);
    setIsModalOpen(true);
  };

  // بستن مودال
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryIdToDelete(null);
  };

  const handleDelete = useCallback(
    (id: string) => {
      deletBlogCategory(
        { id },
        {
          onSuccess: () => {
            showToast("دسته‌بندی با موفقیت حذف شد", "success");
            queryClient.invalidateQueries({
              queryKey: ["getAll-blogsCategory"],
            });
            closeModal();
          },
          onError: () => {
            showToast("حذف دسته‌بندی با خطا مواجه شد", "error");
            closeModal();
          },
        }
      );
    },
    [deletBlogCategory, queryClient]
  );

  return (
    <div>
      <TitleStructureDashboards mainTitle="دسته‌بندی" />
      {data.length !== 0 && (
        <div className="flex justify-end w-[95%] mb-4">
          <Link href={"/admin/blogs/category/create"}>
            <Button
              className="bg-secondary-500 text-white shadow-md rounded-xl px-4 py-2 hover:bg-secondary-600 transition"
              endContent={<FaPlus />}
            >
              افزودن
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-8 overflow-x-auto">
        {isPending ? (
          <div className="text-center text-gray-500">
            <BtnLoader color="#377cfb" />
          </div>
        ) : data.length === 0 ? (
          <Empty
            hidden={true}
            spanValue="دسته‌بندی"
            btn={true}
            btnValue="افزودن دسته بندی"
            btnHref="/admin/blogs/category/create"
            // btnOnClick={handleReserve}
          />
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <Table className="min-w-full divide-y divide-gray-200">
              <Table.Header className="bg-gray-100 text-gray-700">
                <th className="px-4 py-3 text-sm font-semibold">#</th>
                <th className="px-4 py-3 text-sm font-semibold">نام دسته</th>
                <th className="px-4 py-3 text-sm font-semibold">اسلاگ</th>
                <th className="px-4 py-3 text-sm font-semibold text-center">
                  عملیات
                </th>
              </Table.Header>
              <Table.Body>
                {data.map((item: blogDatafromServer, index: number) => (
                  <Table.Row
                    key={item.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.category_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {item.slug}
                    </td>
                    <td className="px-4 py-3 flex justify-center items-center ">
                      <Link
                        href={`/admin/blogs/category/create?id=${item.id}`}
                        className="inline-flex"
                      >
                        <Button
                          variant="light"
                          isIconOnly
                          className=" text-default-300  p-2 transition"
                        >
                          <TbEyeDiscount size={18} />
                        </Button>
                      </Link>
                      <Button
                        variant="light"
                        isIconOnly
                        className=" text-red-600  p-2 transition"
                        onPress={() => openModal(item.id)}
                      >
                        <MdDeleteOutline size={18} />
                      </Button>
                    </td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>

      {/* مودال تایید حذف */}
      <ModalModule
        title="آیا مطمئن هستید؟"
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={() => {
          if (categoryIdToDelete) {
            handleDelete(categoryIdToDelete);
          }
        }}
      >
        <p>آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟</p>
      </ModalModule>
    </div>
  );
};

export default CategoryBlog;
