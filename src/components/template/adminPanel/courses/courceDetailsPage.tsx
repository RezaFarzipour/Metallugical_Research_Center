"use client";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import ModalModule from "@/components/element/ModalModule";
import { showToast } from "@/store/useToastSlice";
import {
  toEnglishNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { formatDateRangesToPersian } from "@/utils/formatter/formatDateRangesToPersian";
import { Button } from "@heroui/button";
import { ServiceData } from "@/types/serviceType";
import { useDeleteCourse } from "./hooks/useDeleteCource";
// import CarGallery from "@/components/module/ImageGallery";

interface ServiceDetailsPageProps {
  dataByID: ServiceData;
}

const CourseDetailsPage: React.FC<ServiceDetailsPageProps> = ({ dataByID }) => {
  const router = useRouter();
  const { deletService } = useDeleteCourse();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    id,
    service_name,
    description,
    price,
    cover_image,
    // "service-images": serviceImages = [],
    "service-reserve_date": reserveDates = [],
  } = dataByID;

  const coverImageSrc = useMemo(
    () =>
      cover_image.startsWith("http")
        ? cover_image
        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${cover_image}`,
    [cover_image]
  );

  // const galleryImages = useMemo(
  //   () =>
  //     serviceImages.map((img) =>
  //       img.image.startsWith("http")
  //         ? img.image
  //         : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${img.image}`
  //     ),
  //   [serviceImages]
  // );

  const dateRanges = useMemo(
    () => formatDateRangesToPersian(reserveDates),
    [reserveDates]
  );

  const handleEdit = useCallback(() => {
    router.push(`/admin/courses/${id}/edit`);
  }, [id, router]);

  const handleDelete = useCallback(() => {
    if (!id) {
      showToast("آیدی دوره آموزشی نامعتبر است", "error");
      return;
    }
    setIsModalOpen(true);
  }, [id]);

  const handleDeleteService = useCallback(() => {
    if (!id) {
      showToast("آیدی دوره آموزشی نامعتبر است", "error");
      return;
    }

    deletService(
      { id: toEnglishNumbers(id) },
      {
        onSuccess: () => {
          showToast("دوره آموزشی با موفقیت حذف شد", "success");
          setIsModalOpen(false);
          router.push("/admin/services");
        },
        onError: () => {
          showToast("حذف دوره آموزشی با خطا مواجه شد", "error");
        },
      }
    );
  }, [id, deletService, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="دوره آموزشی ها"
          item2=" مشخصات دوره آموزشی"
          panelHref="/admin/services"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* اطلاعات دوره آموزشی */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative w-16 h-16">
              <Image
                className="rounded-full object-cover"
                alt={service_name}
                fill
                src={coverImageSrc}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{service_name}</h2>
          </div>

          <ServiceInfo title="توضیحات" content={description} />
          <ServiceInfo
            title="قیمت محصول"
            content={`${toPersianNumbersWithComma(price)} تومان`}
          />
          <ServiceInfo title="تاریخ‌های رزرو" content={dateRanges || "-"} />

          {/* دکمه‌های عملیات */}
          <div className="flex space-x-4 rtl:space-x-reverse">
            <Button
              onPress={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-secondary-500 to-secondary-700 hover:bg-blue-700 transition"
            >
              <FiEdit size={20} />
              <span className="hidden sm:inline">ویرایش</span>
            </Button>
            <Button
              onPress={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 hover:bg-red-700 transition"
            >
              <FiTrash2 size={20} />
              <span className="hidden sm:inline">حذف</span>
            </Button>
          </div>
        </div>
      </div>

      {/* مدال تایید حذف */}
      {isModalOpen && (
        <ModalModule
          title="حذف دوره آموزشی"
          confirmText="تایید حذف"
          cancelText="انصراف"
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeleteService}
        >
          <p>آیا مطمئنی می‌خوای دوره آموزشی با آیدی {id} رو حذف کنی؟</p>
        </ModalModule>
      )}
    </div>
  );
};

// کامپوننت اطلاعات تکراری
const ServiceInfo = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div>
    <h2 className="font-bold text-default-400">{title}</h2>
    <p className="text-secondary-700 pr-2">{content}</p>
  </div>
);

export default CourseDetailsPage;
