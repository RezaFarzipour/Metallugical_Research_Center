"use client";
import CarGallery from "@/components/module/ImageGallery";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomeDateRangePicker from "../module/customeDataPicker/CustomeCallender";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useAuth";
import {
  patchReserveDetails,
  postReservedService,
} from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { BtnLoader } from "../element/Loader";
import { Button } from "@heroui/button";
import { cn } from "@/utils/cn";
import { toPersianNumbersWithComma } from "@/utils/formatter/toPersianNumbers";

interface ServiceImage {
  id: number;
  image: string;
  service: number;
}

interface ServiceReserveDate {
  id: string;
  reserved_from: string;
  reserved_to: string;
  service: number;
}

interface ServiceDataType {
  id: number;
  service_name: string;
  description: string;
  price: number;
  cover_image: string;
  "service-images": ServiceImage[];
  "service-reserve_date"?: ServiceReserveDate[];
}

const ServiceDetails = ({ serviceData }: { serviceData: ServiceDataType }) => {
  const BASE_URL = "http://localhost:8000";
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const router = useRouter();

  // handle reserve range
  const { reserved_from, reserved_to } =
    serviceData?.["service-reserve_date"]?.[0] || {};

  const {
    id: serviceId,
    service_name,
    description,
    price,
    cover_image,
    "service-images": serviceImages,
  } = serviceData;

  const coverImageSrc = cover_image.startsWith("http")
    ? cover_image
    : BASE_URL + cover_image;

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http") ? img.image : BASE_URL + img.image
    ) || [];

  const { mutateAsync: createServiceReserve, isPending: isCreating } =
    useMutation({
      mutationKey: ["post-reserve"],
      mutationFn: postReservedService,
    });

  const { mutateAsync: patchReserve, isPending: isPatching } = useMutation({
    mutationKey: ["patch-reserve"],
    mutationFn: patchReserveDetails,
  });

  const { data: userData } = useGetUser();

  const handleConfirm = async () => {
    if (!userData || userData.length === 0) {
      router.push("/auth");
      return;
    }

    if (userData?.role === "admin") {
      showToast("لطفا به عنوان کاربر عادی وارد شوید", "error");
      return;
    }

    try {
      const { id } = await createServiceReserve();

      await patchReserve({
        reserve_from: startDate,
        reserve_to: endDate,
        service: serviceId.toString(),
        reserveId: id,
      });

      router.push(`/reservation?reserve-id=${id}&next-stage=1`);
    } catch (e) {
      console.log("err", e);
    }
  };

  const rangeHandler = (reserved_from: Date, reserved_to: Date) => {
    setStartDate(reserved_from.toISOString().split("T")[0]);
    setEndDate(reserved_to.toISOString().split("T")[0]);
  };

  const isConfirmDisabled = !startDate || !endDate;

  return (

    <div className="flex flex-col items-center w-full p-4 md:p-16">
  <div className="w-full flex flex-col lg:flex-row gap-6">
    {/* Right Section */}
    <div className="flex flex-col gap-6 w-full lg:w-1/2">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="relative w-16 h-16">
          <Image
            className="rounded-full object-cover"
            alt={service_name}
            fill
            src={coverImageSrc}
          />
        </div>
        <h2 className="text-2xl font-bold text-[#2563EB]">{service_name}</h2>
      </div>

      <div className="my-6 flex item-start">
        <CarGallery images={galleryImages} />
      </div>
    </div>

    {/* Left Section */}
    <div className="w-full lg:w-1/2">
      <div className="my-12">
        <h3 className="font-bold mb-3">توضیحات</h3>
        <p className="text-justify text-sm text-gray-800">
          آزمایش تشخیص کامل خون یکی از جامع‌ترین آزمایش‌های تشخیصی است...
        </p>
      </div>

      <div className="my-12">
        <h3 className="font-bold mb-3">راهنمای استفاده از دستگاه</h3>
        <ul className="list-disc pr-5 text-right space-y-2 text-sm text-gray-800">
          <li>راهنمای شماره یک</li>
          <li>راهنمای شماره دو</li>
          <li>راهنمای شماره سه</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-3">قبل از رزرو به نکات زیر توجه کنید</h3>
        <div className="bg-blue-50 p-4 rounded-lg text-right">
          <ul className="space-y-2 text-sm text-gray-800">
            <li className="flex items-start">
              <span className="text-blue-600 mt-1 ml-2">✔️</span>
              <span>۸ تا ۱۲ ساعت ناشتا بودن قبل از آزمایش</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mt-1 ml-2">✔️</span>
              <span>خودداری از مصرف الکل ۲۴ ساعت قبل از آزمایش</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mt-1 ml-2">✔️</span>
              <span>اطلاع دادن داروهای مصرفی به پزشک</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mt-1 ml-2">✔️</span>
              <span>همراه داشتن کارت شناسایی و دفترچه بیمه</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  {/* Reservation Box */}
  <div className="w-2/2 bg-white border-t border-2 rounded-xl mt-10 p-4 flex flex-col-reverse md:flex-row justify-center gap-6">
    <div className="bg-blue-50 p-4 rounded-lg w-full md:w-1/2 flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-500">قیمت رزرو</h2>
        <p className="text-blue-600 text-xl font-bold">
          {toPersianNumbersWithComma(price)}
        </p>
      </div>

      <p className="text-green-600 text-xs mt-2">
        این قیمت پیش‌فرض است و در حین رزرو ممکن است توسط ادمین تغییر کند
      </p>

      <div className="w-full h-[2px] mt-6 bg-gray-300" />
      <div className="mt-5 text-sm">
        <p>قیمت نهایی پس از مرحله‌ی دوم رزرو در توضیحات ادمین مشخص می‌شود</p>
      </div>
      <div className="w-full h-[2px] mt-6 bg-gray-300" />

      <div className="flex w-full justify-center mt-5">
        <Button
          disabled={isConfirmDisabled}
          className={cn(
            "text-white px-4 py-2 w-full",
            isConfirmDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-secondary-500 hover:bg-secondary-600"
          )}
          onPress={handleConfirm}
        >
          {isCreating || isPatching ? <BtnLoader /> : "انتخاب رزرو"}
        </Button>
      </div>
    </div>

    <div className="flex justify-center items-center w-full md:w-1/2">
      <CustomeDateRangePicker
        onRangeSelect={rangeHandler}
        reserveData={{
          reserved_from: reserved_from || "",
          reserved_to: reserved_to || "",
        }}
      />
    </div>
  </div>
</div>

  );
};

export default ServiceDetails;
