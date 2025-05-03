"use client";
import React, { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";
import { TbEyeDiscount } from "react-icons/tb";
import { Button } from "@heroui/button";
import Empty from "@/components/element/Empty";
import BtnLoader from "@/components/element/BtnLoader";
import Link from "next/link";
import Table from "@/components/element/Table";
import ModalModule from "@/components/element/ModalModule"; // افزودن مودال
import { getAllCategoryAdmin } from "@/services/api/blogs";
import { useDeleteService } from "../useDeleteCategory";
import { showToast } from "@/store/useToastSlice";

const CategoryBlog = () => {
  const queryClient = useQueryClient();
  const { data = [], isPending } = useQuery({
    queryKey: ["getAll-blogsCategory"],
    queryFn: getAllCategoryAdmin,
  });

  const { deletBlogCategory } = useDeleteService();

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
            closeModal(); // بستن مودال پس از موفقیت
          },
          onError: () => {
            showToast("حذف دسته‌بندی با خطا مواجه شد", "error");
            closeModal(); // بستن مودال در صورت خطا
          },
        }
      );
    },
    [deletBlogCategory, queryClient]
  );

  return (
    <div>
      <Link href={"/admin/blogs/category/create"}>
        <Button>افزودن دسته‌بندی</Button>
      </Link>

      <div className="mt-8 overflow-x-auto">
        {isPending ? (
          <div className="text-center text-gray-500">
            <BtnLoader color="#377cfb" />
          </div>
        ) : data.length === 0 ? (
          <Empty hidden={false} spanValue="دسته‌بندی" />
        ) : (
          <Table>
            <Table.Header>
              <th>#</th>
              <th>نام دسته</th>
              <th>اسلاگ</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {data.map((item, index) => (
                <Table.Row key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.category_name}</td>
                  <td>{item.slug}</td>
                  <td className=" flex justify-center items-center">
                    <Link href={`/admin/blogs/category/create?id=${item.id}`}>
                      <Button isIconOnly>
                        <TbEyeDiscount />
                      </Button>
                    </Link>
                    <Button isIconOnly onPress={() => openModal(item.id)}>
                      <MdDeleteOutline color="red" />
                    </Button>
                  </td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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
