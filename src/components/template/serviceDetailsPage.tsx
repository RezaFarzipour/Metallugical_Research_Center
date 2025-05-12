"use client";

import CarGallery from "@/components/module/ImageGallery";
import { sp } from "@/utils/formatter/numberFormatter";
import Image from "next/image";
import React, { useState } from "react";
import BlurModal from "../element/BlurModal";
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
  const [startDate, setStartDate] = useState<string | null>("");
  const [endDate, setEndDate] = useState<string | null>("");
  

  const router = useRouter();

  // handle reserve range
  const { reserved_from, reserved_to } =
    serviceData?.["service-reserve_date"]?.[0] || {};

  // extract other data
  const {
    id: serviceId,
    service_name,
    description,
    price,
    cover_image,
    "service-images": serviceImages,
  } = serviceData;

  // formatting image urls
  const coverImageSrc = cover_image.startsWith("http")
    ? cover_image
    : BASE_URL + cover_image;

  const galleryImages =
    serviceImages?.map((img) =>
      img.image.startsWith("http") ? img.image : BASE_URL + img.image
    ) || [];

  // mutation
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
      return
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

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-16 container py-20">
      {/* Right Section */}
      <div className="w-full flex flex-col gap-4 mx-10 mb-10 md:mb-0">
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

        <p className="wrap text-justify text-default-400 mb-5">{description}</p>

        <div className="text-center my-5 font-bold text-2xl">
          قیمت محصول: {sp(price)}
        </div>

        <div className="flex justify-center w-full">
          <BlurModal
            heightProp="sm"
            title={isCreating || isPatching ? <BtnLoader /> : " انتخاب رزرو"}
            bodyContent={
              <CustomeDateRangePicker
                onRangeSelect={rangeHandler}
                reserveData={{
                  reserved_from: reserved_from || "",
                  reserved_to: reserved_to || "",
                }}
              />
            }
            onConfirm={handleConfirm}
          />
        </div>
      </div>

      {/* Left Section */}
      <div className="w-full mb-10 md:mb-0">
        <CarGallery images={galleryImages} />
      </div>
    </div>
  );
};

export default ServiceDetails;
