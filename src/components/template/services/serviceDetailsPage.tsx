"use client";
import CarGallery from "@/components/module/ImageGallery";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomeDateRangePicker from "../../module/customeDataPicker/CustomeCallender";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useAuth";
import {
  patchReserveDetails,
  postReservedService,
} from "@/services/api/reserve";
import { showToast } from "@/store/useToastSlice";
import { BtnLoader } from "../../element/Loader";
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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const router = useRouter();

  // handle reserve range
  const { reserved_from, reserved_to } =
    serviceData?.["service-reserve_date"]?.[0] || {};

  const {
    id: serviceId,
    service_name,
    price,
    cover_image,
    "service-images": serviceImages,
    description,
  } = serviceData;

  const coverImageSrc = cover_image.startsWith("http")
    ? cover_image
    : process.env.NEXT_PUBLIC_IMAGE_BASE_URL + cover_image;

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http")
        ? img.image
        : process.env.NEXT_PUBLIC_IMAGE_BASE_URL + img.image
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
      <div className="w-full flex flex-col  gap-6">
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
            <h2 className="text-2xl font-bold text-secondary-500 pt-8">
              {service_name}
            </h2>
          </div>
        </div>

        <div className="pr-12 ">
          <h2 className="text-md text-gray-500 font-bold">توضیحات</h2>
          <p className="text-justify text-sm text-gray-800 pr-4 pt-2">
            {description}{" "}
          </p>
        </div>

        <div className="flex justify-around mt-4 gap-8">
          <div className="my-6 flex item-start">
            <CarGallery images={galleryImages} />
          </div>

          <div className="w-full lg:w-full pt-5 ">
            <div className="bg-white shadow-md rounded-xl p-2 flex flex-col-reverse lg:flex-row gap-6 justify-around">
              {/* قیمت رزرو */}
              <div className=" p-4 rounded-lg w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-md text-gray-500 font-bold">
                      قیمت رزرو
                    </h2>
                    <p className="text-blue-600 text-lg font-bold">
                      {toPersianNumbersWithComma(price)}&nbsp;تومان
                    </p>
                  </div>

                  <p className="text-green-600 text-xs pt-6">
                    ( این قیمت پیش‌فرض است و در حین رزرو ممکن است توسط ادمین
                    تغییر کند)
                  </p>

                  <div className="w-full h-[2px] mt-6 bg-gray-300" />
                  <p className="mt-5 text-sm">
                    قیمت نهایی پس از مرحله‌ی دوم رزرو در توضیحات ادمین مشخص
                    می‌شود
                  </p>
                  <div className="w-full h-[2px] mt-6 bg-gray-300" />
                </div>

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

              {/* تقویم */}
              <div className="w-full lg:w-1/3 flex justify-center items-center">
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
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
