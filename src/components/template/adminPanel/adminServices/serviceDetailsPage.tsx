"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import BreadcrumbsElement from "@/components/element/Breadcrumbs";
import ModalModule from "@/components/element/ModalModule";
import CarGallery from "@/components/module/ImageGallery";
import { showToast } from "@/store/useToastSlice";
import {
  toEnglishNumbers,
  toPersianNumbersWithComma,
} from "@/utils/formatter/toPersianNumbers";
import { useDeleteService } from "./serviceAction/useDeleteService";

const BASE_URL = "http://localhost:8000";

interface ServiceImage {
  id: number;
  image: string;
  service: number;
}

interface ServiceData {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  "service-images": ServiceImage[];
}

interface ServiceDetailsPageProps {
  dataByID: ServiceData;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({
  dataByID,
}) => {
  const {
    service_name,
    description,
    price,
    cover_image,
    "service-images": serviceImages,
  } = dataByID;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deletService } = useDeleteService();
  const router = useRouter();

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http") ? img.image : BASE_URL + img.image
    ) || [];

  const coverImageSrc = cover_image.startsWith("http")
    ? cover_image
    : BASE_URL + cover_image;

  const handleEdit = useCallback(() => {
    router.push(`/admin/services/${dataByID.id}/edit`);
  }, [router, dataByID.id]);

  const handleDelete = useCallback(() => {
    if (!dataByID.id) {
      showToast("آیدی سرویس نامعتبر است", "error");
      return;
    }
    setIsModalOpen(true);
  }, [dataByID.id]);

  const handleDeleteService = useCallback(() => {
    if (!dataByID.id) {
      showToast("آیدی سرویس نامعتبر است", "error");
      return;
    }

    deletService(
      { id: toEnglishNumbers(dataByID.id) },
      {
        onSuccess: () => {
          showToast("سرویس با موفقیت حذف شد", "success");
          setIsModalOpen(false);
          router.push("/admin/services");
        },
        onError: () => {
          showToast("حذف سرویس با خطا مواجه شد", "error");
        },
      }
    );
  }, [dataByID.id, deletService, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BreadcrumbsElement
          item1="سرویس ها"
          item2="سرویس"
          panelHref="/admin/services"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <p className="text-gray-600 leading-relaxed">{description}</p>

          <div className="text-center">
            <span className="text-2xl font-bold text-primary-600">
              قیمت محصول: {toPersianNumbersWithComma(price)}
            </span>
          </div>

          {/* دکمه های ادیت و دیلیت با آیکون */}
          <div className="flex space-x-4 rtl:space-x-reverse">
            <div>
              {/* <CustomeCallender  /> */}
              شسیشی
            </div>

            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <FiEdit size={20} />
              <span className="hidden sm:inline">ویرایش</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              <FiTrash2 size={20} />
              <span className="hidden sm:inline">حذف</span>
            </button>
          </div>
        </div>

        <div className="w-full">
          <CarGallery images={galleryImages} />
        </div>
      </div>
      {isModalOpen && (
        <ModalModule
          title="حذف سرویس"
          confirmText="تایید حذف"
          cancelText="انصراف"
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleDeleteService}
        >
          <p>آیا مطمئنی می‌خوای سرویس با آیدی {dataByID.id} رو حذف کنی؟</p>
        </ModalModule>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
