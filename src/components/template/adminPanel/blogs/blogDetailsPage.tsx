"use client";
import ModalModule from "@/components/element/ModalModule";
import { showToast } from "@/store/useToastSlice";
import { BlogData } from "@/types";
import { Button } from "@heroui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDeleteBlog } from "./hooks/useDeleteBlog";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";

const BlogDetailsPage = ({ dataByID }: { dataByID: BlogData }) => {
  const contentRender = dataByID[`blog-content`][0].content;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteBLog } = useDeleteBlog();
  const client = useApolloClient();
  const router = useRouter();

  //remove [] from tag
  let tagsArray: string[] = [];
  try {
    if (Array.isArray(dataByID.tags) && typeof dataByID.tags[0] === "string") {
      tagsArray = JSON.parse(dataByID.tags[0]); // چون به صورت استرینگ داخل آرایه هست
    }
  } catch (err) {
    console.error("Error parsing tags:", err);
  }

  //delete blog

  const ConfirmDeleteBlog = async () => {
    if (!dataByID.id) {
      console.error("ID for deletion is undefined or null");
      showToast("آیدی سرویس نامعتبر است", "error");
      return;
    }

    deleteBLog(
      { id: dataByID.id },
      {
        onSuccess: async () => {
          showToast("بلاگ با موفقیت حذف شد", "success");
          router.push("/admin/blogs");

          await client.refetchQueries({
            include: ["getAllBlogs"],
          });
        },
        onError: () => {
          showToast("حذف بلاگ با خطا مواجه شد", "error");
        },
      }
    );

    setIsModalOpen(false);
  };

  const BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "http://localhost:8000";

  const getValidImageSrc = (src: string | undefined): string => {
    if (!src) return "/fallback.jpg";
    if (src.startsWith("http") || src.startsWith("/")) return src;
    return `${BASE_URL}/${src}`;
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-6 p-4 shadow-lg">
  {/* اطلاعات سرویس */}
  <div className="flex flex-col space-y-6">
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 shrink-0">
        <Image
          className="rounded-full object-cover"
          alt={dataByID.cover_image}
          fill
          src={getValidImageSrc(dataByID.cover_image)}
        />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-default-400 break-words">
        {dataByID.title}
      </h2>
    </div>

    <ServiceInfo title="اسلاگ" content={dataByID.slug} />
    <ServiceInfo title="تگ ها" content={tagsArray} />
  </div>

  {/* دکمه‌ها */}
  <div className="flex gap-3 md:gap-4 flex-wrap justify-start md:justify-end">
    <Button
      className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-secondary-500 to-secondary-700 hover:bg-secondary-800 transition"
    >
      <FiEdit size={20} />
      <span className="hidden sm:inline">ویرایش</span>
    </Button>
    <Button
      onPress={() => setIsModalOpen(true)}
      className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 hover:bg-red-800 transition"
    >
      <FiTrash2 size={20} />
      <span className="hidden sm:inline">حذف</span>
    </Button>
  </div>
</div>


      {/* مودال حذف سرویس */}
      {isModalOpen && (
        <ModalModule
          title="حذف سرویس"
          confirmText="تایید حذف"
          cancelText="انصراف"
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={ConfirmDeleteBlog}
        >
          <p>آیا مطمئنی می‌خوای بلاگ با عنوان {dataByID.title} رو حذف کنی؟</p>
        </ModalModule>
      )}
      <div className="max-w-screen-lg min-h-screen flex justify-center items-center my-8  mx-auto">
        <div
          className="blogUl__disc blogUl__decimal"
          dangerouslySetInnerHTML={{ __html: contentRender }}
        />
      </div>
    </>
  );
};

export default BlogDetailsPage;

const ServiceInfo = ({
  title,
  content,
}: {
  title: string;
  content: string | string[];
}) => (
  <div className="flex items-center gap-4">
    <h2 className="font-bold text-default-400">{title}</h2>
    <p className="text-secondary-700 pr-2">{content}</p>
  </div>
);
